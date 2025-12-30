import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const cwdDistSwaggerPath = path.join(process.cwd(), 'dist/swagger.json');
const cwdSwaggerPath = path.join(process.cwd(), 'swagger.json');
const distSwaggerPath = path.join(__dirname, '../../dist/swagger.json');
const srcSwaggerPath = path.join(__dirname, '../swagger.json');

const swaggerPath =
  (fs.existsSync(cwdDistSwaggerPath) && cwdDistSwaggerPath) ||
  (fs.existsSync(cwdSwaggerPath) && cwdSwaggerPath) ||
  (fs.existsSync(distSwaggerPath) && distSwaggerPath) ||
  srcSwaggerPath;
export const specs = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));
