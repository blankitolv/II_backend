import CartModel from "../models/carts.models.js";

class CartRepository {
  async createCart() {
    return await CartModel.create({ products: [] });
  }

  async getCartById(id) {
    return await CartModel.findById(id).populate("products.product");
  }

  async addProductToCart(cartId, productId, quantity) {
    const cart = await this.getCartById(cartId);
    const productIndex = cart.products.findIndex(
      (p) => p.product._id.toString() === productId,
    );
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }
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

  // [repository] actualiza la cantidad de un producto existente en el carrito, retorna null si el producto no está en el carrito
  async updateProductQuantity(cartId, productId, quantity) {
    const cart = await this.getCartById(cartId);
    const productIndex = cart.products.findIndex(
      (p) => p.product._id.toString() === productId,
    );

    if (productIndex > -1) {
      cart.products[productIndex].quantity = quantity;
      return await cart.save();
    }

    return null;
  }

  // [repository] vacía el carrito de compras
  async clearCart(cartId) {
    const cart = await this.getCartById(cartId);
    cart.products = [];
    return await cart.save();
  }
}

export default new CartRepository();
