import { pgTable, serial, text, varchar, integer, json, array } from "drizzle-orm/pg-core";

// Table definitions

export const CoFounder = pgTable('cofounder', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    picture: text('picture').notNull(),
    location: text('location').notNull(),
    yoe: integer('yoe'),
    bio: text('bio'),
    connects: integer('connects'),
    analytics: json('analytics'),
    sentence: text('sentence'),
    room: json('room')
});

export const Founder = pgTable('founder', {
    id: integer('id').primaryKey(),
    name: text('name').notNull(),
    picture: text('picture').notNull(),
    location: text('location').notNull(),
    yoe: integer('yoe'),
    prompt: text('prompt'),
    connects: integer('connects'),
    room: json('room')
});

export const Skills = pgTable('skills', {
    cofounder_id: integer('cofounder_id').primaryKey(),
    technical_skill: text('technical_skill').notNull(), 
    area_of_experience: text('area_of_experience').notNull(),
    leadership_style: text('leadership_style').notNull(), 
    communication_skill: text('communication_skill').notNull(), 
    focus: text('focus').notNull(), 
    work_ethic: text('work_ethic').notNull(), 
    fundraising_skill: text('fundraising_skill').notNull(), 
    problem_solving_approach: text('problem_solving_approach').notNull(), 
    role_preference: text('role_preference').notNull(), 
    decision_making_style: text('decision_making_style').notNull(),
    tech_stack: text('tech_stack').array()
});

export const Ideas = pgTable('ideas', {
    idea_id: integer('idea_id').primaryKey(),
    idea_title: text('idea_title').notNull(),
    idea_desc: text('idea_desc').notNull(),
    founder_id: integer('founder_id').references(() => Founder.id, { onDelete: "SET NULL" }),
    pref_yoe: integer('pref_yoe'),  // Consistent snake_case for 'PrefYOE'
    pref_loc: text('pref_loc'),     // Consistent snake_case for 'PrefLoc'
    matched_ids: integer('matched_ids').array(), // Using array to define an integer array column
    industry: text('industry')
});

export const UserList = pgTable('userideas', {
    founder_id: integer('founder_id').references(() => Founder.id, { onDelete: "SET NULL" }),
    cofounder_id: integer('cofounder_id').references(() => CoFounder.id, { onDelete: "SET NULL" })
});

export const UsersTable = pgTable('userstable', {
    id: integer('id').primaryKey(),
    id_type: text('id_type').notNull()
});

export const Qualities = pgTable('qualities', {
    quality_id: integer('quality_id').primaryKey(),
    technical_skill: text('technical_skill').notNull(), 
    area_of_experience: text('area_of_experience').notNull(),
    leadership_style: text('leadership_style').notNull(), 
    communication_skill: text('communication_skill').notNull(), 
    focus: text('focus').notNull(), 
    work_ethic: text('work_ethic').notNull(), 
    fundraising_skill: text('fundraising_skill').notNull(), 
    problem_solving_approach: text('problem_solving_approach').notNull(), 
    role_preference: text('role_preference').notNull(), 
    decision_making_style: text('decision_making_style').notNull(),
    preferred_techstack: text('preferred_techstack').array() 
});