// librerías de terceros
import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import passport from "passport";
import { BOOTSTRAPDIR } from "./src/utils/utils.utils.js";

// librerías propias
import apiUsersRouter from "./src/routes/users.router.js";
import viewsRouter from "./src/routes/views.router.js";
import apiSessionsRouter from "./src/routes/session.router.js";
import { connectMongo } from "./src/config/db.config.js";
import initializePassport from "./src/config/passport.config.js";

// env
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.static("./public"));
app.use("/bootstrap", express.static(BOOTSTRAPDIR));

// passport
initializePassport();
app.use(passport.initialize());

// handlebars
const hbs = handlebars.create({
  helpers: {
    dump: (context) => JSON.stringify(context, "", "  "),
  },
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app
  .set("views", "./src/views")

  // rutas
  .use("/users", apiUsersRouter);
app.use("/", viewsRouter);
app.use("/api/sessions", apiSessionsRouter);

app.get("/", (req, res) => {
  res.redirect("/login");
});

// mongo y server
const PORT = process.env.PORT || 3000;
connectMongo()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🛡️ http://localhost:${PORT}`);
      console.log(`🛡️ http://localhost:${PORT}/login`);
    });
  })
  .catch((error) => {
    console.error("No se pudo montar el servidor: ", error);
  });
