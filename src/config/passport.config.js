import passport from "passport";
import jwt from "passport-jwt";
import UserModel from "../models/users.models.js"; // Asegúrate de que la ruta sea correcta

const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.signedCookies) {
    token = req.signedCookies["currentUser"];
  }
  return token;
};

const initializePassport = () => {
  passport.use(
    "jwt",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwt_payload, done) => {
        try {
          // se solicita el carrito del usuario junto a los datos del mismo
          const user = await UserModel.findById(jwt_payload.id)
            .populate("cart")
            .lean();

          if (!user) {
            return done(null, false, { message: "User not found." });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      },
    ),
  );
};

export default initializePassport;
