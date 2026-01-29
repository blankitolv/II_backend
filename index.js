// librerías de terceros
import express from "express";
import handlebars from "express-handlebars";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import passport from "passport";
import { BOOTSTRAPDIR, BOOTSTRAPICONDIR } from "./src/utils/utils.utils.js";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import Sockets from "./src/socket/socket.js";

// librerías propias
import apiUsersRouter from "./src/routes/users.router.js";
import viewsRouter from "./src/routes/views.router.js";
import apiSessionsRouter from "./src/routes/session.router.js";
import apiProductsRouter from "./src/routes/products.router.js";
import apiCartsRouter from "./src/routes/carts.router.js";
import { connectMongo } from "./src/config/db.config.js";
import initializePassport from "./src/config/passport.config.js";
import { seedDatabase } from "./src/seed/seed.js";

// env
dotenv.config();

const app = express();
const httpServer = http.createServer(app);
const socketServer = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/bootstrap", express.static(BOOTSTRAPDIR));
app.use("/bootstrap-icons", express.static(BOOTSTRAPICONDIR));

app.use(express.static("./public"));

// passport
initializePassport();
app.use(passport.initialize());

app.set("socketio", socketServer);
Sockets(socketServer);

// handlebars
const hbs = handlebars.create({
  helpers: {
    dump: (context) => JSON.stringify(context, " ", "  "),
    eq: (a, b) => a === b,
    dump2: (context) => {
      return new handlebars.SafeString(
        `<pre>${JSON.stringify(context, null, 2)}</pre>`,
      );
    },
    if_stock: (stock) => (stock === 0 ? "disabled" : "-"),
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
app.use("/api/products", apiProductsRouter);
app.use("/api/carts", apiCartsRouter);

app.get("/", (req, res) => {
  res.redirect("/login");
});

// mongo y server
const PORT = process.env.PORT || 3000;
connectMongo()
  .then(async () => {
    await seedDatabase();
    httpServer.listen(PORT, () => {
      console.log(`🛡️ http://localhost:${PORT}`);
      console.log(`🛡️ http://localhost:${PORT}/login`);
    });
  })
  .catch((error) => {
    console.error("No se pudo montar el servidor: ", error);
  });
