import { Router } from "express";
import passport from "passport";
import { loginUser } from "../controller/users.controller.js";

const router = Router();

// Login: genera el JWT
router.post("/login", loginUser);

// Current: valida el JWT y devuelve req.user
router.get("/current",passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      status: "success",
      user: req.user,
    });
  }
);

router.get('/logout', (req, res) => {
  res.clearCookie('currentUser');
  res.redirect('/login');
});

export default router;
