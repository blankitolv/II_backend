import mongoose from "mongoose";
import { consoleColors } from "../utils/utils.utils.js";

// conexión a la base de datos MongoDB
export const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      dbName: process.env.DB_NAME,
    });
    consoleColors("reset", "Conectado a la base de datos 📊");
  } catch (error) {
    consoleColors(
      "rojo",
      "Falló la conexión a la base de datos:",
      error.message,
    );
    throw error;
  }
};
