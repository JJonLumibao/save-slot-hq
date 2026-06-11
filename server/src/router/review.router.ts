import { Router, type Request, type Response } from "express";
import { prisma } from "../db.setup.js";
import { adminVerification, authMiddleware, premiumOrAdminVerification } from "../middleware.js";

const reviewController = Router();

reviewController.get(
  "/reviews", 
  authMiddleware,
  adminVerification, 
  async (req: Request, res: Response) => {
    const reviews = await prisma.review.findMany({
      include: {
        user: {
          select: {
            id: true,
            username: true,
          }
        },
        game: {
          select: {
            id: true,
            name: true,
          }
        }
      }
      
    });
    return res.json(reviews);
  }
);

reviewController.delete(
  "/reviews/:reviewId",
  authMiddleware,
  premiumOrAdminVerification,
  async (req: Request, res: Response) => {
    const reviewId = Number(req.params.reviewId);

    if (Number.isNaN(reviewId)) {
      return res.status(400).json({ error: "Invalid review id" });
    }

    const review = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    await prisma.review.delete({
      where: {
        id: reviewId,
      }
    });

    return res.status(200).json({
      message: `Review ${review.comment} deleted successfully`,
    });
  }
);

export default reviewController;