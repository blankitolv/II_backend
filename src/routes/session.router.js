import { Router } from "express";
import passport from "passport";
import {
  loginUser,
  handleForgotPassword,
  handleResetPassword,
} from "../controller/users.controller.js";
import UserDTO from "../dto/user.dto.js";

const router = Router();

router.post("/forgot-password", handleForgotPassword);
router.post("/reset-password", handleResetPassword);

// Login: genera el JWT
router.post("/login", loginUser);

// Current: valida el JWT y devuelve req.user con el DTO
router.get("/current",passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.json({
      status: "success",
      user: userDTO,
    });
  }
);

router.get('/logout', (req, res) => {
  res.clearCookie('currentUser');
  res.redirect('/login');
});

export default router;
