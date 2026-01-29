import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { ROOT_PATH } from "./utils.utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(ROOT_PATH, "public", "assets", "img", "products"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

export const uploader = multer({ storage });
