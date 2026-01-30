// librerías de terceros
import { Router } from "express";
import passport from "passport";
// librerías propias
import {
  loginUser,
  handleForgotPassword,
  handleResetPassword,
} from "../controller/users.controller.js";

// DTOs
import UserDTO from "../dto/user.dto.js";

const router = Router();

router.post("/forgot-password", handleForgotPassword);
router.post("/reset-password", handleResetPassword);

// Login: genera el JWT
router.post("/login", loginUser);

// Ruta para obtener el usuario actual autenticado
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.json({
      status: "success",
      user: userDTO,
    });
  },
);
// ruta de logout
router.post("/logout", (req, res) => {
  res.clearCookie("currentUser");
  return res.status(200).json({
    status: "success",
    message: "Logout successful.",
    redirect: "/login",
  });
});

export default router;
