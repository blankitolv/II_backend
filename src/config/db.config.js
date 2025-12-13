import mongoose from "mongoose";

export const connectMongo = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: process.env.DB_NAME,
        });
        console.log("Conectado a la base de datos 📊");
    } catch (error) {
        console.error("Falló la conexión a la base de datos:", error.message);
        throw error;
    }
}
