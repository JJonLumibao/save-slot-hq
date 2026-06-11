import { Router } from "express";
import { prisma } from "../db.setup.js";
import type { Request, Response } from "express";
import { adminVerification, authMiddleware } from "../middleware.js";
import { encryptPassword } from "../auth-utils.js";
import type { Prisma } from "@prisma/client";

const userController = Router();

userController.get(
  "/users", 
  authMiddleware,
  adminVerification,
  async (req: Request, res: Response) => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
      }
    });
    return res.json(users);
  }
);

userController.get(
  "/users/favorites", 
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

userController.get(
  "/users/:userId/reviews",
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        reviews: {
          include: {
            game: true,
          }
        }
      },
    });
    return res.json(user?.reviews);
  }
)

userController.patch(
  "/users/favorites/:gameId",
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
  }
);

userController.patch(
  "/users/:userId",
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const { firstName, lastName, username, password, email } = req.body;

    const errors: Record<string, string> = {};

    if (username) {
      const existingUsername = await prisma.user.findUnique({
        where: {
          username,
        },
      });

      if (existingUsername && existingUsername.id !== userId) {
        errors.username = "Username already exists";
      }
    }

    if (email) {
      const existingEmail = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingEmail && existingEmail.id !== userId) {
        errors.email = "Email already exists";
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(409).json({ errors });
    }

    const updateData: Prisma.UserUpdateInput = {
      firstName,
      lastName,
      username,
      email
    }

    if (password) {
      updateData.passwordHash = await encryptPassword(password);
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: updateData,
    });

    const { passwordHash, ...safeUser } = updatedUser;

    return res.json(safeUser);
  }
);

userController.patch(
  "/users/:userId/role",
  authMiddleware,
  adminVerification,
  async (req: Request, res: Response) => {
    const selectedUserId = Number(req.params.userId);
    const { role } = req.body;

    if (!["REGULAR", "PREMIUM", "ADMIN"].includes(role)) {
      return res.status(400).json({
        error: "Invalid role",
      });
    }

    const userExists = await prisma.user.findUnique({
      where: {
        id: selectedUserId,
      }
    });

    if (!userExists) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: selectedUserId,
      }, 
      data: {
        role,
      },
    });

    return res.json(updatedUser);
  }
);

userController.delete(
  "/users/favorites/:gameId",
  authMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const gameId = Number(req.params.gameId);

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        favorites: {
          disconnect: {
            id: gameId,
          },
        },
      },
      include: {
        favorites: true,
      }
    });
    return res.json(updatedUser);
  }
);

userController.delete(
  "/users/:userId",
  authMiddleware,
  adminVerification,
  async (req: Request, res: Response) => {
    const selectedUserId = Number(req.params.userId);

    if (Number.isNaN(selectedUserId)) {
      return res.status(400).json({ error: "Invalid user id" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: selectedUserId,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (selectedUserId === req.user!.id) {
      return res.status(400).json({ error: "You cannot delete your own account" });
    }

    if (user.role === "ADMIN") {
      const adminCount = await prisma.user.count({
        where: {
          role: "ADMIN",
        },
      });
  
      if (adminCount === 1) {
        return res.status(403).json({ error: "You cannot delete the last admin" });
      }
    }

    await prisma.user.delete({
      where: {
        id: selectedUserId,
      }
    });

    return res.status(200).json({
      message: `User ${user.username} deleted successfully`,
    });
  }
);

export default userController;