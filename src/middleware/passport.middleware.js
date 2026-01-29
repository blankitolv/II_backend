import passport from "passport";

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (error, user, info) => {
      if (error) {
        const errorMessage =
          error.message ||
          "Error interno del servidor durante la autenticación.";
        const msg = encodeURIComponent(errorMessage);
        return res.redirect(`/login?error=${msg}`);
      }
      if (!user) {
        const errorMessage =
          info.message ||
          "Credenciales inválidas o sesión expirada. Por favor, inténtalo de nuevo.";
        const msg = encodeURIComponent(errorMessage);
        return res.redirect(`/login?error=${msg}`);
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

export const authorize = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};

export const isLoggedIn = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    if (user) {
      return res.redirect("/current");
    }
    next();
  })(req, res, next);
};
