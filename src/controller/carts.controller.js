import { cartService } from "../services/index.js";

// [Controller] trae un carrito por id
export const getCartById = async (req, res) => {
  try {
    const cart = await cartService.getCartById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [Controller] agrega un producto al carrito
export const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCart = await cartService.addProductToCart(
      cid,
      pid,
      quantity || 1,
    );
    res.status(200).json(updatedCart);
  } catch (error) {
    if (error.message.includes("Insufficient stock")) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// [Controller] vacia un carrito de compras
export const deleteCart = async (req, res) => {
  try {
    const clearedCart = await cartService.clearCart(req.params.cid);
    if (!clearedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart cleared", cart: clearedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [Controller] elimina un producto del carrito
export const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const updatedCart = await cartService.deleteProductFromCart(cid, pid);
    res
      .status(200)
      .json({ message: "Product removed from cart", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [Controller] actualiza la cantidad de un producto en el carrito
export const updateProductQuantity = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const updatedCart = await cartService.updateProductQuantity(
      cid,
      pid,
      quantity,
    );

    if (!updatedCart) {
      return res.status(404).json({
        status: "error",
        message: "Product not found in cart. Cannot update quantity.",
      });
    }

    res
      .status(200)
      .json({ message: "Product quantity updated", cart: updatedCart });
  } catch (error) {
    if (error.message.includes("Insufficient stock")) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal server error" });
  }
};

// [Controller] realiza la compra de un carrito
export const purchaseCart = async (req, res) => {
  const { cid } = req.params;
  const userId = req.user._id;
  const purchaserEmail = req.user.email;
  console.log("CID: ", cid);
  console.log("UserID: ", userId);

  try {
    const { ticket, productsNotPurchased } = await cartService.purchaseCart(
      cid,
      userId,
      purchaserEmail,
    );

    if (ticket) {
      res.status(200).json({
        status: "success",
        message: "Purchase completed successfully!",
        ticket,
        productsNotPurchased,
      });
    } else {
      res.status(400).json({
        status: "failed",
        message: "No products could be purchased or stock issues.",
        productsNotPurchased,
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
