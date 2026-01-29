import CartService from "../services/carts.service.js";

// Controller to create a new cart
export const createCart = async (req, res) => {
  try {
    const newCart = await CartService.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to get a cart by ID
export const getCartById = async (req, res) => {
  try {
    const cart = await CartService.getCartById(req.params.cid);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to add a product to a cart
export const addProductToCart = async (req, res) => {
  console.log("LLEGUE");
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  console.log("LLEGUE2");
  console.log("CARTID: ", cid);
  console.log("PRODUCTID: ", pid);
  console.log("QUANTITY: ", quantity);
  try {
    const updatedCart = await CartService.addProductToCart(
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

console.log("LLEGUE4");
// Controller to delete all products from a cart
export const deleteCart = async (req, res) => {
  try {
    const clearedCart = await CartService.clearCart(req.params.cid);
    if (!clearedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart cleared", cart: clearedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to delete a product from a cart
export const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const updatedCart = await CartService.deleteProductFromCart(cid, pid);
    res
      .status(200)
      .json({ message: "Product removed from cart", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update a cart with an array of products
export const updateCart = async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const updatedCart = await CartService.updateCart(cid, products);
    res.status(200).json({ message: "Cart updated", cart: updatedCart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller to update the quantity of a product in a cart
export const updateProductQuantity = async (req, res) => {
  console.log("CUPQ1");
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  console.log("CUPQ2");
  try {
    const updatedCart = await CartService.updateProductQuantity(
      cid,
      pid,
      quantity,
    );
    console.log("CUPQ3");
    res
      .status(200)
      .json({ message: "Product quantity updated", cart: updatedCart });
  } catch (error) {
    console.log("CUPQ4");
    if (error.message.includes("Insufficient stock")) {
      return res.status(400).json({ message: error.message });
    }
    console.log("CUPQ5");
    res.status(500).json({ message: "Internal server error" });
  }
  console.log("CUPQ6");
};

export const purchaseCart = async (req, res) => {
  const { cid } = req.params;
  const purchaserEmail = req.user.email; // Assuming req.user is populated by passportCall

  try {
    const { ticket, productsNotPurchased } = await CartService.purchaseCart(
      cid,
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
