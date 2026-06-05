import { Router } from "express";
import { prisma } from "../db.setup.js";
import type { Request, Response, NextFunction } from "express";
import { error } from "node:console";

const gameController = Router();

gameController.get("/games", async (req: Request, res: Response) => {
  const games = await prisma.game.findMany();
  return res.json(games);
});

gameController.get("/games/:gameId/favoritedBy", async (req: Request, res: Response) => {
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
});

export default gameController;