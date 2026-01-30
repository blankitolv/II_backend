import { Router } from "express";
import { registerUser, updateUser } from "../controller/users.controller.js";
import { passportCall } from "../middleware/passport.middleware.js";
import { validateMongoId } from "../middleware/validation.middleware.js";

const router = Router();

router.post("/register", registerUser);

router.put("/:uid", passportCall("jwt"), validateMongoId("uid"), updateUser);

export default router;
