import UserService from "../services/users.service.js";
// CartService is now imported dynamically below
import { generateToken } from "../utils/jwt.utils.js";
import bcrypt from "bcrypt";

export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    const errorMessage =
      "error en el inicio de sesión, revisa tus credenciales";
    const msg = encodeURIComponent(errorMessage);
    return res.redirect(`/login?error=${msg}`);
  }

  const user = await UserService.findUserByEmail(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    const errorMessage =
      "error en el inicio de sesión, revisa tus credenciales";
    const msg = encodeURIComponent(errorMessage);
    return res.redirect(`/login?error=${msg}`);
  }

  const token = generateToken(user);

  res.cookie("currentUser", token, { signed: true, httpOnly: true });
  res.redirect("/current");
}

export async function registerUser(req, res) {
  try {
    // 1. Dynamically import CartService to break the circular dependency
    const CartService = (await import("../services/carts.service.js")).default;
    
    // 2. Create the cart first
    const newCart = await CartService.createCart();

    // 3. Add cart ID to user data and register the user
    const userData = { ...req.body, cartId: newCart._id };
    const userCreated = await UserService.registerUser(userData);


    const token = generateToken(userCreated);
    res.cookie("currentUser", token, { signed: true, httpOnly: true });
    res.redirect("/current");
  } catch (error) {
    console.error("Registration error:", error);
    const msg = encodeURIComponent(
      error.message || "An error occurred during registration.",
    );
    return res.redirect(`/register?error=${msg}`);
  }
}

export async function handleForgotPassword(req, res) {
  const { email } = req.body;
  try {
    await UserService.sendPasswordResetLink(email);
    const msg = encodeURIComponent("If an account with that email exists, a password reset link has been sent.");
    res.redirect(`/login?error=${msg}`);
  } catch (error) {
    const msg = encodeURIComponent("An error occurred. Please try again.");
    res.redirect(`/forgot-password?error=${msg}`);
  }
}

export async function handleResetPassword(req, res) {
  const { token, password } = req.body;
  try {
    await UserService.resetPassword(token, password);
    const msg = encodeURIComponent("Your password has been reset successfully. Please log in.");
    res.redirect(`/login?error=${msg}`);
  }
  catch (error) {
    const msg = encodeURIComponent(error.message || "An error occurred. Please try again.");
    // Redirect back to the reset form with the token
    res.redirect(`/reset-password/${token}?error=${msg}`);
  }
}
