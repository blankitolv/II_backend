import CartModel from "../models/carts.models.js";

class CartRepository {
  async createCart() {
    return await CartModel.create({ products: [] });
  }

  async getCartById(id) {
    return await CartModel.findById(id).populate("products.product");
  }

  async addProductToCart(cartId, productId, quantity) {
    console.log("j1");
    const cart = await this.getCartById(cartId);
    console.log("j2");
    const productIndex = cart.products.findIndex(
      (p) => p.product._id.toString() === productId,
    );

    console.log("j3");
    if (productIndex > -1) {
      console.log("j4");
      cart.products[productIndex].quantity += quantity;
    } else {
      console.log("j5");
      cart.products.push({ product: productId, quantity });
    }
    console.log("j6");
    return await cart.save();
  }

  async deleteProductFromCart(cartId, productId) {
    const cart = await this.getCartById(cartId);
    cart.products = cart.products.filter(
      (p) => p.product._id.toString() !== productId,
    );
    return await cart.save();
  }

  async updateCart(cartId, products) {
    const cart = await this.getCartById(cartId);
    cart.products = products;
    return await cart.save();
  }

  async updateProductQuantity(cartId, productId, quantity) {
    console.log("UPC1");
    const cart = await this.getCartById(cartId);
    console.log("UPC2");
    const productIndex = cart.products.findIndex(
      (p) => p.product._id.toString() === productId,
    );

    console.log("UPC3");
    if (productIndex > -1) {
      console.log("UPC4");
      cart.products[productIndex].quantity = quantity;
    }
    console.log("UPC5");
    return await cart.save();
  }

  async clearCart(cartId) {
    const cart = await this.getCartById(cartId);
    cart.products = [];
    return await cart.save();
  }
}

export default new CartRepository();
