import { defineConfig } from '@prisma/config';
import dotenv from 'dotenv';

// Carga las variables desde .env.local
dotenv.config({ path: '.env.local' });

export default defineConfig({
  datasource: {
    url: process.env.DATABASE_URL,
  },
});