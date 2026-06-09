import { Router } from "express";
import { prisma } from "../db.setup.js";
import type { Request, Response } from "express";
import { adminVerification, authMiddleware, premiumVerification } from "../middleware.js";

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
    const game = await prisma.game.findUnique({
      where: {
        id: gameId,
      },
      include: {
        favoritedBy: true,
      },
    });

    if (!game) {
      return res.status(404).send({
        error: "Game not found",
      });
    }

    return res.json(game.favoritedBy);
  }
);

gameController.get(
  "/games/:gameId/reviews",
  async (req: Request, res: Response) => {
    const gameId = Number(req.params.gameId);
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
  premiumVerification,
  async (req: Request, res: Response) => {
    const gameId = Number(req.params.gameId);
    const userId = req.user!.id;
    const { rating, comment } = req.body;

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
)

gameController.post(
  "/games", 
  authMiddleware,
  adminVerification,
  async (req: Request, res: Response) => {
    const { name, description } = req.body;
    const newGame = await prisma.game.create({
      data: {
        name,
        description,
      },
    });

    return res.status(200).json(newGame);
  }
)



export default gameController;