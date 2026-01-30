// librerías de terceros
import { Router } from "express";
import jwt from "jsonwebtoken";

// librerías propias
import { productService, cartService, userService } from "../services/index.js";

// middlewares
import {
  passportCall,
  isLoggedIn,
  authorize,
} from "../middleware/passport.middleware.js";

const router = Router();

router.get("/forgot-password", (req, res) => {
  res.render("forgot-password");
});

router.get("/reset-password/:token", (req, res) => {
  const { token } = req.params;
  try {
    // Verify the token synchronously
    jwt.verify(token, process.env.JWT_SECRET);
    res.render("reset-password", { token });
  } catch (error) {
    // If token is invalid or expired
    const msg = encodeURIComponent("Invalid or expired password reset link.");
    return res.redirect(`/login?error=${msg}`);
  }
});

router.get("/login", isLoggedIn, (req, res) => {
  const error = req.query.error;
  res.render("login", { error });
});

router.get("/register", (req, res) => {
  const error = req.query.error;
  res.render("register", { error });
});

router.get("/current", passportCall("jwt"), async (req, res) => {
  const user = await userService.findUserById(req.user.id);
  res.render("current", { user });
});

router.get("/products", passportCall("jwt"), async (req, res) => {
  const products = await productService.getAllProducts(req.query);
  const user = await userService.findUserById(req.user.id);
  const error = req.query.error;
  res.render("products", { products, user, error });
});

router.get("/cart", passportCall("jwt"), async (req, res) => {
  const user = await userService.findUserById(req.user.id);
  let cart = await cartService.getCartById(user.cart);
  cart = cart.toObject();
  res.render("cart", { cart, user });
});

router.get(
  "/admin",
  passportCall("jwt"),
  authorize("admin"),
  async (req, res) => {
    const user = await userService.findUserById(req.user.id);
    res.render("admin", { user });
  },
);

export default router;
