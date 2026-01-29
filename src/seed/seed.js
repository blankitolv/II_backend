import UserModel from "../models/users.models.js";
import ProductModel from "../models/products.models.js";
import CartService from "../services/carts.service.js";
import bcrypt from "bcrypt";
import fs from "fs/promises";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const USERS_PATH = path.join(__dirname, "users.json");
const PRODUCTS_PATH = path.join(__dirname, "products.json");

export const seedDatabase = async () => {
  try {
    const userCount = await UserModel.countDocuments();
    const productCount = await ProductModel.countDocuments();

    if (userCount > 0 && productCount > 0) {
      console.log("Database already seeded. Skipping.");
      return;
    }

    console.log("Database is empty. Seeding...");

    // Seed Products
    if (productCount === 0) {
      const productsData = await fs.readFile(PRODUCTS_PATH, "utf-8");
      const products = JSON.parse(productsData);
      // The products are nested in an array
      if (products.length > 0 && Array.isArray(products[0])) {
        await ProductModel.insertMany(products[0]);
        console.log(`${products[0].length} products have been added.`);
      }
    }

    // Seed Users
    if (userCount === 0) {
      const usersData = await fs.readFile(USERS_PATH, "utf-8");
      const users = JSON.parse(usersData);

      const createdUsers = [];
      for (const user of users) {
        const newCart = await CartService.createCart();
        const hashedPassword = bcrypt.hashSync(user.password, 10);

        createdUsers.push({
          ...user,
          password: hashedPassword,
          cart: newCart._id,
        });
      }

      await UserModel.insertMany(createdUsers);
      console.log(`${createdUsers.length} users have been added.`);
    }
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};
