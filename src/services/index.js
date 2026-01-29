import CartService from "./carts.service.js";
import ProductService from "./products.service.js";
import UserService from "./users.service.js";
import { sendEmail } from "./mailing.service.js";

export const mailingService = {
  sendEmail,
};

export const productService = new ProductService();
export const userService = new UserService();
export const cartService = new CartService(productService, mailingService);
