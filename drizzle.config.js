import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.tsx",
  dbCredentials: {
    url: 'postgresql://ai-content-generator-DB_owner:UD8x3JQjZcCs@ep-yellow-thunder-a8xpaffl.eastus2.azure.neon.tech/ai-content-generator-DB?sslmode=require'
  }
});
