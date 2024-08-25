import pandas as pd
import numpy as np
import psycopg2
import psycopg2.extras
import torch
import pickle
from transformers import BertTokenizer, BertForSequenceClassification
import os
from dotenv import load_dotenv
from sklearn.metrics.pairwise import cosine_similarity

# Load environment variables from .env file
load_dotenv()

# Database connection function
def connect_db():
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        raise ValueError("Database URL not found. Check your .env file.")
    return psycopg2.connect(db_url)

# Load the model, tokenizer, and mlb
def load_model(model_dir="./saved_model"):
    model = BertForSequenceClassification.from_pretrained(model_dir)
    tokenizer = BertTokenizer.from_pretrained(model_dir)
    
    with open(os.path.join(model_dir, 'mlb.pkl'), 'rb') as f:
        mlb = pickle.load(f)
    
    return model, tokenizer, mlb

# Function to predict skills from an input idea description
def predict_skills(idea_description, model, tokenizer, mlb):
    inputs = tokenizer(idea_description, return_tensors='pt', truncation=True, padding=True)
    outputs = model(**inputs)
    probabilities = torch.sigmoid(outputs.logits).detach().numpy()
    
    # Adjust the threshold as needed (e.g., 0.5)
    predicted_labels = (probabilities >= 0.6).astype(int)
    predicted_skills = mlb.inverse_transform(predicted_labels)
    
    # Flatten the list of tuples returned by inverse_transform
    skills_dict = {category: skills for category, skills in zip(mlb.classes_, predicted_skills)}
    
    return skills_dict

# Function to match founder qualities with potential co-founders' skills
def match_qualities(founder_id):
    # Connect to the database
    conn = connect_db()
    cur = conn.cursor(cursor_factory=psycopg2.extras.DictCursor)
    
    # Fetch the founder's qualities and prompt using a JOIN between qualities and founder tables
    cur.execute("""
        SELECT q.technical_skill, q.area_of_experience, q.leadership_style, q.communication_skill, q.focus, q.work_ethic, q.fundraising_skill, q.problem_solving_approach, q.role_preference, q.decision_making_style, f.prompt 
        FROM qualities q
        INNER JOIN founder f ON q.quality_id::text = f.id
        WHERE q.quality_id = %s
    """, (founder_id,))

    founder_wants_from_cofounder = cur.fetchone()
    
    if not founder_wants_from_cofounder:
        print(f"No data found for founder ID {founder_id}")
        return
    
    # Debug: Print the fetched founder data
    print("1. Data founder wants cofounder to have:\n", founder_wants_from_cofounder)

    # Extract the relevant qualities
    qualities = {
        'Technical Skill': founder_wants_from_cofounder['technical_skill'],
        'Area of Experience': founder_wants_from_cofounder['area_of_experience'],
        'Leadership Style': founder_wants_from_cofounder['leadership_style'],
        'Communication Skill': founder_wants_from_cofounder['communication_skill'],
        'Focus': founder_wants_from_cofounder['focus'],
        'Work Ethic': founder_wants_from_cofounder['work_ethic'],
        'Fundraising Skill': founder_wants_from_cofounder['fundraising_skill'],
        'Problem-Solving Approach': founder_wants_from_cofounder['problem_solving_approach'],
        'Role Preference': founder_wants_from_cofounder['role_preference'],
        'Decision-Making Style': founder_wants_from_cofounder['decision_making_style']
    }
    
    # Debug: Print the extracted qualities
    print("2.Qualities:\n", qualities)

    # Get the prompt from the founder table. Prompt is the idea that the founder has
    prompt = founder_wants_from_cofounder['prompt']
    
    # Fetch all skills data from the database
    cur.execute("""
        SELECT technical_skill, area_of_experience, leadership_style, communication_skill, focus, work_ethic, 
               fundraising_skill, problem_solving_approach, role_preference, decision_making_style,tech_stack 
        FROM skills;
    """)
    skills_data = pd.DataFrame(cur.fetchall(), columns=[desc[0] for desc in cur.description])
    
    # Debug: Print the fetched skills data
    print("3. Skills Data:\n", skills_data.head())

    # Close the database connection
    cur.close()
    conn.close()
    
    # Load the model, tokenizer, and mlb
    model, tokenizer, mlb = load_model()

    # Run the BERT model on the founder's prompt to get the preferred tech stack
    predicted_skills = predict_skills(prompt, model, tokenizer, mlb)

    # Debug: Print the predicted skills
    print(f"4. Predicted Skills required for the idea given by  {founder_id}: {predicted_skills}") #bert model build

    # Print the predicted tech stack
    print(f"5. Predicted Tech Stack for Founder ID {founder_id}: {predicted_skills.get('Tech_Stack')}")
    
    # Now match founder's qualities with co-founders' skills
    def encode_skills(row):
        return np.array([1 if skill in row else 0 for skill in qualities.values()])

    founder_encoded = np.array([encode_skills(qualities)])
    # Handle the case where founder_encoded might be empty or not a 2D array
    skills_encoded = np.array([encode_skills(row) for _, row in skills_data.iterrows()])

    # Check if either array is empty before calculating similarity
    if founder_encoded.size == 0 or skills_encoded.size == 0:
        print("No valid data to compute similarity.")
        return

    # Debug: Print encoded founder skills
    # print("5. Encoded Founder Skills:\n", founder_encoded)

    # if founder_encoded.ndim == 1:
    #     founder_encoded = founder_encoded.reshape(1, -1)
    

    # skills_encoded = skills_data.apply(encode_skills, axis=1).values

    # Debug: Print encoded skills data
    print("6. Encoded Skills Data:\n", skills_encoded)

    # Handle the case where skills_encoded might be empty or not a 2D array
    # if skills_encoded.ndim == 1:
    #     skills_encoded = skills_encoded.reshape(-1, 1)

    # Check if either array is empty before calculating similarity
    # if founder_encoded.size == 0 or skills_encoded.size == 0:
    #     print("No valid data to compute similarity.")
    #     return

    # Calculate cosine similarity between founder and co-founder skills
    similarity_scores = cosine_similarity(founder_encoded, skills_encoded).flatten()
    
    # Attach the similarity scores back to the skills dataframe
    skills_data['Similarity'] = similarity_scores
    
    # Rank co-founders by similarity
    ranked_cofounders = skills_data.sort_values(by='Similarity', ascending=False)
    
    # Display top matches (optional, for debug)
    print("Top matching co-founders based on qualities:")
    print(ranked_cofounders.head())

    # Update the qualities table with the predicted tech stack
    conn = connect_db()
    cur = conn.cursor()
    preferred_techstack = ', '.join(predicted_skills.get('Tech_Stack', []))  # Convert the array to a comma-separated string
    
    cur.execute("""
        UPDATE qualities 
        SET preferred_techstack = %s 
        WHERE quality_id = %s
    """, (preferred_techstack, founder_id))
    
    # Commit the changes and close the connection
    conn.commit()
    cur.close()
    conn.close()

    print("Preferred Tech Stack updated successfully.")

if __name__ == '__main__':
    # Input founder ID from the terminal
    founder_id = input("Enter Founder ID: ")
    
    # Call the function to match qualities and update the preferred tech stack
    match_qualities(founder_id)