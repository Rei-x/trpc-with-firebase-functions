import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  clean: true,
  external: ['firebase-admin', 'firebase-functions'],
  minify: true,
});
