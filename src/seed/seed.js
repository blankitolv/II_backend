// librerías de terceros
import bcrypt from "bcrypt";
import fs from "fs/promises";
import path from "path";

// librerías propias
import UserModel from "../models/users.models.js";
import ProductModel from "../models/products.models.js";
import { cartService } from "../services/index.js";
import { ROOT_PATH } from "../utils/utils.utils.js";
import { consoleColors } from "../utils/utils.utils.js";

const USERS_PATH = path.join(ROOT_PATH, "src", "seed", "users.json");
const PRODUCTS_PATH = path.join(ROOT_PATH, "src", "seed", "products.json");

export const seedDatabase = async () => {
  try {
    const userCount = await UserModel.countDocuments();
    const productCount = await ProductModel.countDocuments();

    if (userCount > 0 && productCount > 0) {
      consoleColors("verde", "✅ La base de datos ya está populada.");
      return;
    }

    consoleColors(
      "amarillo",
      "🚨 La base de datos está vacía. Iniciando el proceso de seed...",
    );

    // productos básicos del sistema
    if (productCount === 0) {
      const productsData = await fs.readFile(PRODUCTS_PATH, "utf-8");
      const products = JSON.parse(productsData);
      if (products.length > 0 && Array.isArray(products[0])) {
        await ProductModel.insertMany(products[0]);
        consoleColors("verde", `se agregaro ${products[0].length} productos.`);
      }
    }

    // usuarios básicos del sistema
    if (userCount === 0) {
      const usersData = await fs.readFile(USERS_PATH, "utf-8");
      const users = JSON.parse(usersData);

      const createdUsers = [];
      for (const user of users) {
        const newCart = await cartService.createCart();
        const hashedPassword = bcrypt.hashSync(user.password, 10);

        createdUsers.push({
          ...user,
          password: hashedPassword,
          cart: newCart._id,
        });
        consoleColors(
          "verde",
          "🚀🚀🚀  [Creando usuarios] USER:",
          user.email,
          " - PASSWORD:",
          user.password,
        );
      }

      await UserModel.insertMany(createdUsers);
    }
  } catch (error) {
    consoleColors("rojo", " 🚨🚨🚨  Error populando la base de datos:", error);
  }
};
