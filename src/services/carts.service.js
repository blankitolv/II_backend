import CartRepository from "../repository/carts.repository.js";

import TicketModel from "../models/tickets.models.js";

import fs from "fs";
import path from "path";
import handlebars from "handlebars";

import { UTILS_DIRNAME } from "../utils/utils.utils.js";

const __dirname = UTILS_DIRNAME;

export default class CartService {
  constructor(productService, mailingService) {
    this.cartRepository = CartRepository;
    this.productService = productService;
    this.mailingService = mailingService;
  }

  // [service] crea un carrito cuando se crea un usuario
  async createCart() {
    return this.cartRepository.createCart();
  }

  // [service] obtiene un carrito por su id
  async getCartById(id) {
    return this.cartRepository.getCartById(id);
  }

  // [service] realiza la compra de un carrito
  async purchaseCart(cartId, userId, purchaserEmail) {
    const cart = await this.cartRepository.getCartById(cartId);
    console.log("CART EN SERVICE:", cart);
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
        itemsToPurchase.push({
          product: product._id,
          title: product.title,
          price: product.price,
          quantity: item.quantity,
        });

        totalAmount += product.price * item.quantity;

        await this.productService.updateProduct(product._id, {
          stock: product.stock - item.quantity,
        });
      } else {
        productsNotPurchased.push(item);
      }
    }

    let ticket = null;
    if (itemsToPurchase.length > 0) {
      ticket = await TicketModel.create({
        amount: totalAmount,
        purchaser: userId, // Corrected: Use userId here
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

      await this.mailingService.sendEmail(
        purchaserEmail,
        "Your purchase confirmation",
        html,
      );
    }

    // Actualiza el carrito con los productos no comprados
    await this.cartRepository.updateCart(cartId, productsNotPurchased);

    return { ticket, productsNotPurchased };
  }

  // [service] agrega un producto al carrito
  async addProductToCart(cartId, productId, quantity) {
    const product = await this.productService.getProductById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    const cart = await this.cartRepository.getCartById(cartId);
    if (!cart) {
      throw new Error("Cart not found");
    }

    const productInCart = cart.products.find(
      (item) => item.product._id.toString() === productId,
    );

    const newTotalQuantity =
      (productInCart ? productInCart.quantity : 0) + quantity;

    if (!product.validate_quantity_stock(newTotalQuantity)) {
      throw new Error("Insufficient stock for the requested quantity.");
    }

    return this.cartRepository.addProductToCart(cartId, productId, quantity);
  }

  // [service] actualiza la cantidad de un producto existente en el carrito
  async updateProductQuantity(cartId, productId, quantity) {
    const product = await this.productService.getProductById(productId);
    if (!product) {
      throw new Error("Product not found");
    }

    if (!product.validate_quantity_stock(quantity)) {
      throw new Error("Insufficient stock");
    }
    return this.cartRepository.updateProductQuantity(
      cartId,
      productId,
      quantity,
    );
  }

  // [service] elimina un producto del carrito
  async deleteProductFromCart(cartId, productId) {
    return this.cartRepository.deleteProductFromCart(cartId, productId);
  }

  // [service] vacía el carrito de compras
  async clearCart(cartId) {
    return this.cartRepository.clearCart(cartId);
  }
}
