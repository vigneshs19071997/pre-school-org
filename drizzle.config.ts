import type { Config } from 'drizzle-kit';
import { config } from 'dotenv';

// Next.js loads .env.local automatically; drizzle-kit runs standalone and
// needs to be told - there is no plain .env file in this project.
config({ path: '.env.local' });

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: { url: process.env.DATABASE_URL! },
} satisfies Config;
