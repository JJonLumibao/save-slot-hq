import express from "express";
import cors from "cors";
import type { User } from "@prisma/client";
import authController from "./router/auth.router.js"
import userController from "./router/user.router.js";
import "dotenv/config"
import gameController from "./router/game.router.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(authController);
app.use(userController);
app.use(gameController);

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

["DATABASE_URL", "JWT_SECRET"].forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`Environment variable ${key} is not set`);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});