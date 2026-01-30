import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const UTILS_DIRNAME = path.dirname(__filename);

export const ROOT_PATH = path.join(__dirname, "..", "..");

export const BOOTSTRAPDIR = path.join(
  process.cwd(),
  "node_modules",
  "bootstrap",
);
export const BOOTSTRAPICONDIR = path.join(
  process.cwd(),
  "node_modules",
  "bootstrap-icons",
);

export const consoleColors = (color = "reset", ...args) => {
  const colorDefs = {
    red: ["red", "r", "rojo"],
    green: ["green", "g", "verde"],
    yellow: ["yellow", "y", "amarillo"],
    blue: ["blue", "b", "azul"],
    reset: ["reset", "0"],
    white: ["white", "w", "blanco"],
    black: ["black", "k", "negro"],
    magenta: ["magenta", "m", "morado"],
    cyan: ["cyan", "c", "celeste"],
  };

  const colorCodes = {
    cyan: "\x1b[36m",
    magenta: "\x1b[35m",
    black: "\x1b[30m",
    white: "\x1b[37m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    reset: "\x1b[0m",
  };

  const colores = new Map();

  for (const [color, aliases] of Object.entries(colorDefs)) {
    for (const alias of aliases) {
      colores.set(alias.toLowerCase(), colorCodes[color]);
    }
  }

  const colorCode = colores.get(color) || colores.get("reset");
  console.log(colorCode, ...args, colores.get("reset"));
};

export const documentacionURL = () => {
  const documentationPATH = path.join(ROOT_PATH, "documentation");
  const pageDocumentation = path.join(ROOT_PATH, "documentation", "index.html");
  const postmanCollection = path.join(
    ROOT_PATH,
    "documentation",
    "postman",
    "backend_2.postman_collection.json",
  );

  return `\n 📄${documentationPATH}\n 📄${pageDocumentation}\n 📄${postmanCollection}\n `;
};
