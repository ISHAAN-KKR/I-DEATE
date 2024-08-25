// import type { Config } from "drizzle-kit";
/** @type { import("drizzle-kit").Config } */
export default {
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: 'postgresql://knowidea_owner:mdA6Kbjzyuk8@ep-square-glitter-a1gbbiez.ap-southeast-1.aws.neon.tech/knowidea?sslmode=require'
  }
};