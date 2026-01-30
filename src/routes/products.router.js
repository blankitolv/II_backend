// librerías de terceros
import { Router } from "express";

// librerías propias
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/products.controller.js";

// middlewares
import { validateMongoId } from "../middleware/validation.middleware.js";
import { passportCall, authorize } from "../middleware/passport.middleware.js";
import { uploader } from "../utils/multer.utils.js";

const router = Router();

// ruta: obtiene todos los productos o un subconjunto basado en query params de usuario registrado
router.get("/", passportCall("jwt"), getAllProducts);

// ruta: obtiene un producto por su id
router.get(
  "/:pid",
  passportCall("jwt"),
  validateMongoId("pid"),
  getProductById,
);

// ruta: crea un producto (solo admin)
router.post(
  "/",
  passportCall("jwt"),
  authorize("admin"),
  uploader.array("thumbnails"),
  createProduct,
);

// ruta: actualiza un producto por su id (solo admin)
router.put(
  "/:pid",
  passportCall("jwt"),
  authorize("admin"),
  validateMongoId("pid"),
  updateProduct,
);

// ruta: elimina un producto por su id (solo admin), soft delete
router.delete("/:pid", passportCall("jwt"), authorize("admin"), deleteProduct);

export default router;
