// import type { Config } from "drizzle-kit";
/** @type { import("drizzle-kit").Config } */
export default {
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: 'postgresql://knowidea_owner:rdS4aszxJuA2@ep-square-glitter-a1gbbiez-pooler.ap-southeast-1.aws.neon.tech/knowidea?sslmode=require'
  }
};