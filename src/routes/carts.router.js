import { Router } from "express";
import {
  createCart,
  getCartById,
  addProductToCart,
  deleteCart,
  deleteProductFromCart,
  updateCart,
  updateProductQuantity,
  purchaseCart, // Add this import
} from "../controller/carts.controller.js";
import { passportCall, authorize } from "../middleware/passport.middleware.js";

const router = Router();

router.post("/", passportCall("jwt"), authorize("user"), createCart);
router.get("/:cid", passportCall("jwt"), getCartById);
router.post(
  "/:cid/product/:pid",
  passportCall("jwt"),
  authorize("user"),
  addProductToCart,
);
router.delete("/:cid", passportCall("jwt"), authorize("user"), deleteCart);
router.delete(
  "/:cid/products/:pid",
  passportCall("jwt"),
  authorize("user"),
  deleteProductFromCart,
);
router.put("/:cid", passportCall("jwt"), authorize("user"), updateCart);
router.put(
  "/:cid/products/:pid",
  passportCall("jwt"),
  authorize("user"),
  updateProductQuantity,
);

router.post(
  "/:cid/purchase",
  passportCall("jwt"),
  authorize("user"),
  purchaseCart,
);

export default router;
