import User from "../models/users.models.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.utils.js";

export async function loginUser(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    const errorMessage =
      "error en el inicio de sesión, revisa tus credenciales";
    const msg = encodeURIComponent(errorMessage);
    return res.redirect(`/login?error=${msg}`);
  }

  const usuario_encontrado = await User.findOne({ email });
  if (
    !usuario_encontrado ||
    !bcrypt.compareSync(password, usuario_encontrado.password)
  ) {
    const errorMessage =
      "error en el inicio de sesión, revisa tus credenciales";
    const msg = encodeURIComponent(errorMessage);
    return res.redirect(`/login?error=${msg}`);
  }

  const token = generateToken(usuario_encontrado);

  res.cookie("currentUser", token, { signed: true, httpOnly: true });
  res.redirect("/current");
}

export async function registerUser(req, res) {
  const { first_name, last_name, email, password, age } = req.body;
  if (!first_name || !last_name || !email || !password) {
    const msg = encodeURIComponent(
      "No se pudo realizar el registro, valide su datos [code:1]"
    );

    return res.redirect(`/register?error=${msg}`);
  }

  const hashedPass = bcrypt.hashSync(password, 10);

  const usuario_encontrado = await User.findOne({ email });
  if (usuario_encontrado) {
    const msg = encodeURIComponent(
      "No se pudo realizar el registro, valide su datos [code:2]"
    );
    return res.redirect(`/login?error=${msg}`);
  }

  const newUser = {
    first_name,
    last_name,
    email,
    password: hashedPass,
    age,
  };

  const userCreated = await User.create(newUser);

  const token = generateToken(userCreated);

  res.cookie("currentUser", token, { signed: true, httpOnly: true });

  res.redirect("/current");
}
