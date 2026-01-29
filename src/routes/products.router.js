import { Router } from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controller/products.controller.js";
import { passportCall, authorize } from "../middleware/passport.middleware.js";
import { uploader } from "../utils/multer.utils.js";

const router = Router();

router.get("/", passportCall("jwt"), getAllProducts);
router.get("/:pid", passportCall("jwt"), getProductById);
router.post(
  "/",
  passportCall("jwt"),
  authorize("admin"),
  uploader.array("thumbnails"),
  createProduct,
);
router.put("/:pid", passportCall("jwt"), authorize("admin"), updateProduct);
router.delete("/", passportCall("jwt"), authorize("admin"), deleteProduct);

export default router;
