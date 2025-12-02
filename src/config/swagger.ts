import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerPath = path.join(__dirname, '../swagger.json');
export const specs = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));
