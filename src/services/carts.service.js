import CartRepository from "../repository/carts.repository.js";
import ProductService from "./products.service.js";
import TicketModel from "../models/tickets.models.js";
import { sendEmail } from "../utils/mailing.utils.js";
import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

class CartService {
  constructor() {
    this.cartRepository = CartRepository;
    this.productService = ProductService;
  }

  async createCart() {
    return this.cartRepository.createCart();
  }

  async getCartById(id) {
    return this.cartRepository.getCartById(id);
  }

  async purchaseCart(cartId, purchaserEmail) {
    const cart = await this.cartRepository.getCartById(cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const itemsToPurchase = [];
    const productsNotPurchased = [];
    let totalAmount = 0;

    for (const item of cart.products) {
      const product = await this.productService.getProductById(
        item.product._id,
      );

      if (product && product.validate_quantity_stock(item.quantity)) {
        // Prepare item for the ticket
        itemsToPurchase.push({
          product: product._id,
          title: product.title,
          price: product.price,
          quantity: item.quantity,
        });

        totalAmount += product.price * item.quantity;

        // Update product stock
        await this.productService.updateProduct(product._id, {
          stock: product.stock - item.quantity,
        });
      } else {
        productsNotPurchased.push(item);
      }
    }

    let ticket = null;
    if (itemsToPurchase.length > 0) {
      // Generate sequential order number
      const lastTicket = await TicketModel.findOne().sort({ order_number: -1 });
      const newOrderNumber = (lastTicket && typeof lastTicket.order_number === 'number') ? lastTicket.order_number + 1 : 1;

      ticket = await TicketModel.create({
        order_number: newOrderNumber,
        amount: totalAmount,
        purchaser: purchaserEmail,
        items: itemsToPurchase,
      });

      // Send purchase confirmation email
      const templatePath = path.join(
        __dirname,
        "../views/email/purchase_success.handlebars",
      );
      const templateSource = fs.readFileSync(templatePath, "utf8");
      const template = handlebars.compile(templateSource);
      const html = template({ ticket: ticket.toObject() }); // Pass ticket as a plain object

      await sendEmail(purchaserEmail, "Your purchase confirmation", html);
    }

    // Update the cart with products that could not be purchased
    await this.cartRepository.updateCart(cartId, productsNotPurchased);

    return { ticket, productsNotPurchased };
  }

  async addProductToCart(cartId, productId, quantity) {
    const product = await this.productService.getProductById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    if (!product.validate_quantity_stock(quantity)) {
      throw new Error("Insufficient stock");
    }
    return this.cartRepository.addProductToCart(cartId, productId, quantity);
  }

  async updateProductQuantity(cartId, productId, quantity) {
    const product = await this.productService.getProductById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    if (!product.validate_quantity_stock(quantity)) {
      throw new Error("Insufficient stock");
    }
    return this.cartRepository.updateProductQuantity(cartId, productId, quantity);
  }
}

export default new CartService();
