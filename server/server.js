import { JWT_SECRET_KEY } from "json-server-auth/dist/constants.js";
import auth from "json-server-auth";
import express from "express";
import jsonServer from "json-server";
import jwt from "jsonwebtoken";
import cors from "cors";

const server = express();
const router = jsonServer.router("data/menu.json");
server.use(cors());

server.get("/profile", auth, (req, res) => {
  const token = req.header("Authorization")
    ? req.header("Authorization").replace("Bearer ", "")
    : null;

  if (token) {
    try {
      const data = jwt.verify(token, JWT_SECRET_KEY);
      const { db } = req.app;
      const { password, ...user } = db
        .get("users")
        .find({ email: data.email })
        .value();

      res.status(200).json(user);
    } catch (error) {
      res.status(401).json({ error: error });
    }
  } else {
    res.status(401).json({ error: { name: "User not authorized" } });
  }
});

server.db = router.db;

server.use(auth);
server.use(router);

server.listen(3000, () => {
  console.log("Started server");
});
