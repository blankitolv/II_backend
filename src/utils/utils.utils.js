import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Esto te da la raíz real del proyecto:
export const ROOT_PATH = path.join(__dirname, '..',"..");

// Ruta a node_modules/bootstrap/dist
export const BOOTSTRAPDIR = path.join(ROOT_PATH, 'node_modules/bootstrap/dist');