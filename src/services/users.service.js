// librerías de terceros
import bcrypt from "bcrypt";

// librerías propias
import UserRepository from "../repository/users.repository.js";
import { sendEmail } from "../services/mailing.service.js";
import {
  generatePasswordResetToken,
  verifyPasswordResetToken,
} from "../utils/jwt.utils.js";

export default class UserService {
  constructor() {
    this.userRepository = UserRepository;
  }

  async findUserById(id) {
    return this.userRepository.findUserById(id);
  }

  async findUserByEmail(email) {
    return this.userRepository.findUserByEmail(email);
  }

  async registerUser(userData) {
    const { first_name, last_name, email, password, age, cartId } = userData;
    console.log("---", userData);

    if (!first_name || !last_name || !email || !password || !cartId) {
      throw new Error("Missing required fields for registration");
    }

    const userExists = await this.userRepository.findUserByEmail(email);
    if (userExists) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      age,
      cart: cartId,
    };

    const createdUser = await this.userRepository.createUser(newUser);

    if (!email.endsWith("@example.com")) {
      await sendEmail(
        email,
        "Bienvenido a Nuestro Ecommerce",
        `<h1>¡Bienvenido, ${first_name}!</h1> 
        <p>Gracias por registrarte en nuestro ecommerce. Esperamos que disfrutes de tu experiencia de compra.</p>`,
      );
    }

    return createdUser;
  }

  async updateUser(id, userData) {
    // Hashear la contraseña si se está actualizando
    if (userData.password) {
      userData.password = bcrypt.hashSync(userData.password, 10);
    }

    // Evitar que se actualicen campos protegidos
    delete userData.role;
    delete userData.cart;

    return this.userRepository.updateUser(id, userData);
  }

  async sendPasswordResetLink(email) {
    const user = await this.userRepository.findUserByEmail(email);
    if (!user) {
      // No revelamos si el usuario existe o no por seguridad
      console.log(`Password reset requested for non-existent user: ${email}`);
      return;
    }

    const token = generatePasswordResetToken(email);
    const resetLink = `http://localhost:${process.env.PORT || 8080}/reset-password/${token}`;

    const emailBody = `<h1>Restablecimiento de Contraseña</h1>
      <p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace para continuar:</p>
      <a href="${resetLink}">Restablecer Contraseña</a>
      <p>Este enlace expirará en 1 hora.</p>`;

    await sendEmail(email, "Restablecimiento de Contraseña", emailBody);
  }

  async resetPassword(token, newPassword) {
    const decodedToken = verifyPasswordResetToken(token);
    if (!decodedToken) {
      throw new Error("Invalid or expired password reset token.");
    }

    const user = await this.userRepository.findUserByEmail(decodedToken.email);
    if (!user) {
      throw new Error("User not found.");
    }

    // Verificar que la nueva contraseña no sea la misma que la anterior
    if (bcrypt.compareSync(newPassword, user.password)) {
      throw new Error("New password cannot be the same as the old password.");
    }

    // Hashear y actualizar la nueva contraseña
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    await this.userRepository.updateUser(user._id, {
      password: hashedPassword,
    });
  }
}
