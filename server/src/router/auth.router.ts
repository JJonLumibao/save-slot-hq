import { Router } from "express";
import type { Response } from "express";
import { prisma } from "../db.setup.js"
import { validateRequest } from "../middleware.js";
import { z } from "zod";
import bcrypt from "bcrypt";
import { createTokenForUser, createUnsecuredUserInfo, encryptPassword } from "../auth-utils.js";

const authController = Router();

// LOGIN ENDPOINT
authController.post(
  "/auth/login", 
  validateRequest({
    body: z.object({
      username: z.string(),
      password: z.string(),
    }),
  }), 
  async ({body: {username: bodyUsername, password: bodyPassword}}, res: Response) => {
    const user = await prisma.user.findUnique({
      where: {
        username: bodyUsername,
      }
    });

    if(!user) {
      return res.status(404).json({
        error: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(bodyPassword, user.passwordHash);

    if(!isPasswordValid) {
      return res.status(401).json({
        error: "Invalid password",
      });
    }

    const userInfo = createUnsecuredUserInfo(user);
    const token = createTokenForUser(user);

    return res.status(200).json({
      message: "Login successful",
      user: userInfo,
      token: token, 
    });
  }
);

// REGISTER ENDPOINT
authController.post(
  "/auth/signup", 
  validateRequest({
    body: z.object({
      firstName: z.string().min(2),
      lastName: z.string().min(2),
      username: z.string().min(2),
      email: z.email(),
      password: z.string().min(8),
    }),
  }), async ({
    body: {
      firstName: bodyFirstName,
      lastName: bodyLastName,
      username: bodyUsername,
      email: bodyEmail,
      password: bodyPassword,
    }
  }, res: Response) => {
    const existingUsername = await prisma.user.findFirst({
      where: {
        username: bodyUsername,
      },
    });

    const existingEmail = await prisma.user.findFirst({
      where: {
        email: bodyEmail,
      },
    });

    const errors: Record<string, string> = {};

    if(existingUsername) {
      errors.username = "Username already exists";
    }

    if(existingEmail) {
      errors.email = "Email already exists"
    }

    if(Object.keys(errors).length > 0) {
      return res.status(409).json({ errors });
    }
    
    const hashedPassword = await encryptPassword(bodyPassword);

    const user = await prisma.user.create({
      data: {
        firstName: bodyFirstName,
        lastName: bodyLastName,
        username: bodyUsername,
        email: bodyEmail,
        passwordHash: hashedPassword,
        role: "REGULAR",
      },
    });

    const userInfo = createUnsecuredUserInfo(user);
    const token = createTokenForUser(user);

    return res.status(201).json({
      message: "Sign up successful",
      user: userInfo,
      token: token,
    });
  }
);

export default authController;