import { userService, cartService } from "../services/index.js";
import { generateToken } from "../utils/jwt.utils.js";
import bcrypt from "bcrypt";

export async function loginUser(req, res) {
  const { email, password } = req.body;
  console.log("PASE");
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "error", message: "Email and password are required." });
  }

  try {
    const user = await userService.findUserByEmail(email);
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({
        status: "error",
        message: "Invalid credentials. Please check your email and password.",
      });
    }

    const token = generateToken(user);
    res.cookie("currentUser", token, { signed: true, httpOnly: true });

    return res.status(200).json({
      status: "success",
      message: "Login successful.",
      redirect: "/current",
    });
  } catch (error) {
    console.error("Login error:", error);
    return res
      .status(500)
      .json({ status: "error", message: "An internal error occurred." });
  }
}

export async function registerUser(req, res) {
  try {
    const newCart = await cartService.createCart();
    const userData = { ...req.body, cartId: newCart._id };

    const userCreated = await userService.registerUser(userData);
    const token = generateToken(userCreated);

    res.cookie("currentUser", token, { signed: true, httpOnly: true });

    return res.status(201).json({
      status: "success",
      message: "User registered successfully.",
      redirect: "/current",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(400).json({
      status: "error",
      message: error.message || "An error occurred during registration.",
    });
  }
}

export async function handleForgotPassword(req, res) {
  const { email } = req.body;
  try {
    await userService.sendPasswordResetLink(email);
    return res.status(200).json({
      status: "success",
      message:
        "If an account with that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred. Please try again.",
    });
  }
}

export async function handleResetPassword(req, res) {
  const { token, password } = req.body;
  try {
    await userService.resetPassword(token, password);
    return res.status(200).json({
      status: "success",
      message: "Your password has been reset successfully. Please log in.",
      redirect: "/login",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(400).json({
      status: "error",
      message: error.message || "An error occurred. Please try again.",
    });
  }
}

export async function updateUser(req, res) {
  const { uid } = req.params;
  const userData = req.body;

  // Security check: un usuario normal solo puede actualizar su propio perfil
  if (req.user.role !== "admin" && req.user.id !== uid) {
    return res.status(403).json({
      status: "error",
      message: "Forbidden: You can only update your own profile.",
    });
  }

  try {
    const updatedUser = await userService.updateUser(uid, userData);
    if (!updatedUser) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found." });
    }

    delete updatedUser.password;

    return res.status(200).json({ status: "success", payload: updatedUser });
  } catch (error) {
    console.error("Update user error:", error);
    return res
      .status(500)
      .json({ status: "error", message: "An internal error occurred." });
  }
}
