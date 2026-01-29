import UserRepository from "../repository/users.repository.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mailing.service.js";

class UserService {
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
         <p>Gracias por registrarte en nuestro ecommerce. Esperamos que disfrutes de tu experiencia de compra.</p>`
      );
    }

    return createdUser;
  }
}

export default new UserService();
