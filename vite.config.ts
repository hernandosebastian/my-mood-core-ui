import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import path from 'path';
import { defineConfig } from 'vite';

import tsconfig from './tsconfig.json';

dotenv.config();

const rawAlias = tsconfig.compilerOptions.paths;
const alias = {};

for (const x in rawAlias) {
  alias[x.replace('/*', '')] = rawAlias[x].map((p) =>
    path.resolve(__dirname, p.replace('/*', '')),
  );
}

export default defineConfig({
  resolve: { alias },
  plugins: [react()],
  server: {
    host: true,
    port: process.env.VITE_APP_PORT ? +process.env.VITE_APP_PORT : 5173,
  },
});
