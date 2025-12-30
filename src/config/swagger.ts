import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distSwaggerPath = path.join(__dirname, '../../dist/swagger.json');
const srcSwaggerPath = path.join(__dirname, '../swagger.json');

const swaggerPath = fs.existsSync(distSwaggerPath) ? distSwaggerPath : srcSwaggerPath;
export const specs = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));
