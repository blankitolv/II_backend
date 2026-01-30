import jwt from "jsonwebtoken";
import { consoleColors } from "./utils.utils.js";

const JWT_SECRET = process.env.JWT_SECRET;

export function generateToken(user) {
  const payload = {
    id: user._id || user.id,
    email: user.email,
    role: user.role,
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });
}

export function generatePasswordResetToken(email) {
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
  consoleColors("verde", "token de restablecimiento generado: ", token);
  consoleColors("verde", "email utilizado generado: ", email);
  return token;
}

export function verifyPasswordResetToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
