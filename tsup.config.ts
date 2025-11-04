import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/server.ts'],
  format: ['esm'],
  outDir: 'dist',
  external: ['connect-mongo', 'compression', 'express-rate-limit', 'safe-buffer'],
  noExternal: [],
  splitting: false,
  sourcemap: false,
  clean: true,
  minify: false,
});
