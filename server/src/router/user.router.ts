import { Router } from "express";
import { prisma } from "../db.setup.js";
import type { Request, Response, NextFunction } from "express";
import { authMiddleware } from "../middleware.js";

const userController = Router();

userController.get("/users", async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  return res.json(users);
});

userController.get("/users/favorites", 
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        favorites: true,
      },
    });
    return res.json(user?.favorites);
  }
)

userController.patch("/users/favorites/:gameId",
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user!.id
    const gameId = Number(req.params.gameId);

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favorites: {
          connect: {
            id: gameId,
          },
        },
      },
      include: {
        favorites: true,
      }
    });
    return res.json(updatedUser);
});

userController.delete("/users/favorites/:gameId",
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user!.id
    const gameId = Number(req.params.gameId);

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favorites: {
          connect: {
            id: gameId,
          },
        },
      },
      include: {
        favorites: true,
      }
    });
    return res.json(updatedUser);
});

export default userController;