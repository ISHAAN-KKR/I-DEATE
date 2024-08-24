"use client"
import React, { useState } from 'react';
import MultipleSelectChip from './_components/Questions';
import { motion } from 'framer-motion';
const questions = [
    {
      "question": "Which technical skill is most important in a co-founder?",
      "options": ["Programming", "Design", "Marketing", "Sales", "Operations"]
    },
    {
      "question": "Which area should the co-founder have expertise in?",
      "options": ["Finance", "Product Development", "Marketing", "Operations", "Strategy"]
    },
    {
      "question": "What leadership style do you value most?",
      "options": ["Visionary", "Democratic", "Autocratic", "Transformational", "Coaching"]
    },
    {
      "question": "Which communication skill is most crucial?",
      "options": ["Verbal", "Written", "Presentation", "Negotiation", "Interpersonal"]
    },
    {
      "question": "Should the co-founder focus more on execution or strategy?",
      "options": ["Execution", "Strategy"]
    },
    {
      "question": "Which work ethic is non-negotiable?",
      "options": ["Integrity", "Perseverance", "Adaptability", "Discipline", "Accountability"]
    },
    {
      "question": "Which skill set is more important for fundraising?",
      "options": ["Pitching", "Networking", "Financial Analysis", "Negotiation", "Storytelling"]
    },
    {
      "question": "Which problem-solving approach do you prefer?",
      "options": ["Analytical", "Creative", "Collaborative", "Systematic", "Intuitive"]
    },
    {
      "question": "Do you prioritize technical skills or business acumen?",
      "options": ["Technical Skills", "Business Acumen"]
    },
    {
      "question": "What kind of decision-making do you value?",
      "options": ["Data-Driven", "Gut Feeling", "Consensus-Based", "Risk-Taking", "Deliberative"]
    }
  ];

const Page = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  if (!questions || questions.length === 0) {
    return <div>No questions available.</div>;
  }

  const handleNext = (selectedValues) => {
    // Save the current answer
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { question: questions[currentQuestionIndex].question, answer: selectedValues },
    ]);

    // Move to the next question or handle submit
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // All questions answered, handle form submission here
      console.log("All answers:", answers);
      // Example: send answers to a server, display a summary, etc.
    }
  };

  return (
    <section className="bg-black">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-4xl text-center">
          <motion.h1
           
          animate={{ y: 0 ,
            opacity: 1
          }}
          initial={{ y: -100,
            opacity: 0
           }}
          transition={{ ease: "linear",
            duration: .5, }}
          className="text-xl font-extrabold text-lime-300 sm:text-5xl transition-all ">
            {questions[currentQuestionIndex]?.question || "Question not found"}
          </motion.h1>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <MultipleSelectChip
              params={questions[currentQuestionIndex]}
              onNext={handleNext}
              isLast={currentQuestionIndex === questions.length - 1}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
