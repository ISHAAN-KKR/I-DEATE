import { drizzle } from "drizzle-orm/neon-serverless";
import { createClient } from "@neondatabase/serverless";

// Create a Neon client and export the Drizzle ORM instance
const connection = createClient({
  connectionString: process.env.DATABASE_URL, // Make sure this environment variable is set
});

export const db = drizzle(connection);
