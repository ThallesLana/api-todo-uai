import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ['esm'],
  outDir: 'dist',
  external: ['connect-mongo', 'compression', 'express-rate-limit', 'safe-buffer'],
  noExternal: [],
  splitting: false,
  sourcemap: true,
  clean: true,
  minify: false,
});
