import type { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { getDataFromAuthToken } from "./auth-utils.js";
import { prisma } from "./db.setup.js"

type RequestSchemas = {
  body?: z.ZodTypeAny;
  params?: z.ZodTypeAny;
  query?: z.ZodTypeAny;
}

export const validateRequest = (schemas: RequestSchemas) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (schemas.body) {
      const result = schemas.body.safeParse(req.body);
      if (!result.success) {
        return res.status(400).json({
          error: "Invalid request body",
        });
      }
    }

    if (schemas.params) {
      const result = schemas.params.safeParse(req.params);
      if (!result.success) {
        return res.status(400).json({
          error: "Invalid request params",
        });
      }
    }

    if (schemas.query) {
      const result = schemas.query.safeParse(req.query);
      if (!result.success) {
        return res.status(400).json({
          error: "Invalid request query",
        });
      }
    }

    next();
  };
};

export const authMiddleware = async (
  req: Request,
  res: Response, 
  next: NextFunction,
) => {
  const [, token] = req.headers.authorization?.split?.(" ") || [];
  const myJwtData = getDataFromAuthToken(token);
  if (!myJwtData) {
    return res.status(401).json({
      error: "Invalid token",
    });
  }

  const userFromJwt = await prisma.user.findFirst({
    where: {
      username: myJwtData.username,
    },
  });
  if (!userFromJwt) {
    return res.status(401).json({
      error: "User not found",
    });
  }
  req.user = userFromJwt;
  next();
}