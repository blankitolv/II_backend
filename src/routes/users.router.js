import { Router } from "express";
import { registerUser, updateUser } from "../controller/users.controller.js";
import { passportCall } from "../middleware/passport.middleware.js";
import { validateMongoId } from "../middleware/validation.middleware.js";

const router = Router();

// ruta: registra un nuevo usuario
router.post("/register", registerUser);

// ruta: actualiza un usuario
router.put("/:uid", passportCall("jwt"), validateMongoId("uid"), updateUser);

export default router;
