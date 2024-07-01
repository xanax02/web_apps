import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

if (!process.env.DATABASE_URL) {
  console.log("CANNOT FIND DB URL");
}

export default {
  schema: "./src/lib/supabase/schema.ts",
  output: "./migrations",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || " ",
  },
};
