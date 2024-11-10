import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';

import tsconfig from './tsconfig.json';

dotenv.config();

const rawAlias: { [key: string]: string[] } =
  tsconfig.compilerOptions.paths || [];
const alias = [] as { find: string; replacement: string }[];

for (const key in rawAlias) {
  alias.push({
    find: key.replace('/*', ''),
    replacement: path.resolve(__dirname, rawAlias[key][0].replace('/*', '')),
  });
}

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias,
  },
  server: {
    host: true,
    port: process.env.VITE_APP_PORT ? +process.env.VITE_APP_PORT : 5173,
  },
});
