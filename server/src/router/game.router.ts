import { Router } from "express";
import { prisma } from "../db.setup.js";
import type { Request, Response } from "express";
import { adminVerification, authMiddleware, premiumOrAdminVerification, validateRequest } from "../middleware.js";
import z from "zod";

const gameController = Router();

gameController.get(
  "/games", 
  async (req: Request, res: Response) => {
    const games = await prisma.game.findMany();
    return res.json(games);
  }
);

gameController.get(
  "/games/:gameId/favoritedBy", 
  async (req: Request, res: Response) => {
    const gameId = Number(req.params.gameId);
    
    if (Number.isNaN(gameId)) {
      return res.status(400).json({ error: "Invalid game id" });
    }

    const game = await prisma.game.findUnique({
      where: { 
        id: gameId, 
      },
      include: { 
        favoritedBy: true, 
      },
    });

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    return res.json(game.favoritedBy);
  }
);

gameController.get(
  "/games/:gameId/reviews",
  async (req: Request, res: Response) => {
    const gameId = Number(req.params.gameId);

    if (Number.isNaN(gameId)) {
      return res.status(400).json({ error: "Invalid game id" });
    }

    const game = await prisma.game.findUnique({
      where: { 
        id: gameId 
      },
    });

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    const reviews = await prisma.review.findMany({
      where: { 
        gameId, 
      },
      include: {
        user: {
          select: {
            username: true,
          }
        }
      }
    });

    return res.json(reviews);
  }
);

gameController.post(
  "/games/:gameId/reviews",
  authMiddleware,
  premiumOrAdminVerification,
  async (req: Request, res: Response) => {
    
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const gameId = Number(req.params.gameId);
    const userId = req.user.id;
    const { rating, comment } = req.body;

    if (Number.isNaN(gameId)) {
      return res.status(400).json({ error: "Invalid game id" });
    }

    const game = await prisma.game.findUnique({
      where: { 
        id: gameId 
      },
    });

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        userId, 
        gameId,
      },
    });

    return res.status(200).json(review);
  }
);

gameController.post(
  "/games", 
  authMiddleware,
  adminVerification,
  validateRequest({
    body: z.object({
      name: z.string().max(30),
      description: z.string().max(100),
    })
  }), async ({
    body: {
      name: bodyName,
      description: bodyDesciption,
    }
  }, res: Response) => {
    const newGame = await prisma.game.create({
      data: {
        name: bodyName,
        description: bodyDesciption,
      },
    });

    return res.status(200).json(newGame);
  }
);

gameController.delete(
  "/games/:gameId",
  authMiddleware,
  adminVerification,
  async (req: Request, res: Response) => {
    const gameId = Number(req.params.gameId);

    if (Number.isNaN(gameId)) {
      return res.status(400).json({ error: "Invalid game id" });
    }

    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
    });

    if (!game) {
      return res.status(404).json({ error: "Game not found" });
    }

    await prisma.game.delete({
      where: {
        id: gameId,
      }
    });

    return res.status(200).json({
      message: `Game ${game.name} deleted successfully`,
    });
  }
);

export default gameController;