// librerías de terceros
import { Router } from "express";

// librerías propias
import {
  getCartById,
  addProductToCart,
  deleteCart,
  deleteProductFromCart,
  updateProductQuantity,
  purchaseCart,
} from "../controller/carts.controller.js";
import { passportCall, authorize } from "../middleware/passport.middleware.js";

import { validateMongoId } from "../middleware/validation.middleware.js";

const router = Router();

// ruta: solicita el carrito de un usuario registrado
router.get("/:cid", validateMongoId("cid"), passportCall("jwt"), getCartById);

// ruta: agrega un producto al carrito de un usuario registrado con cantidad y sin cantidad default 1
router.post(
  "/:cid/product/:pid",
  validateMongoId("cid"),
  validateMongoId("pid"),
  passportCall("jwt"),
  authorize("user"),
  addProductToCart,
);

// ruta: elimina el carrito de un usuario registrado (soft delete)
router.delete(
  "/:cid",
  validateMongoId("cid"),
  passportCall("jwt"),
  authorize("user"),
  deleteCart,
);

// ruta: elimina un producto del carrito de un usuario registrado
router.delete(
  "/:cid/product/:pid",
  validateMongoId("cid"),
  validateMongoId("pid"),
  passportCall("jwt"),
  authorize("user"),
  deleteProductFromCart,
);

/**
 * ruta: actualiza la cantidad de un producto en el carrito de un usuario registrado
 * el producto debe existir en el carrito
 */
router.put(
  "/:cid/products/:pid",
  validateMongoId("cid"),
  validateMongoId("pid"),
  passportCall("jwt"),
  authorize("user"),
  updateProductQuantity,
);

/**
 * ruta: realiza la compra del carrito de un usuario registrado con rol "user"
 */
router.post(
  "/:cid/purchase",
  validateMongoId("cid"),
  passportCall("jwt"),
  authorize("user"),
  purchaseCart,
);

export default router;
