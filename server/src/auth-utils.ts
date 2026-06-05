import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import type { User } from "@prisma/client"
import { z } from "zod";

export const encryptPassword = (password: string) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

export const createUnsecuredUserInfo = (user: User) => {
  return { 
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    role: user.role
  }
};

function isJwtSecretValid() {
  const jwtSecret = process.env.JWT_SECRET; 
  if(!jwtSecret) {
    throw new Error("JWT_SECRET is undefied");
  }
};

export const createTokenForUser = (user: User) => {
  const userInformation = { username: user.username };
  isJwtSecretValid;
  return jwt.sign(createUnsecuredUserInfo(user), process.env.JWT_SECRET!);
};

const jwtInfoSchema = z.object({
  username: z.string(),
  iat: z.number(),
});

export const getDataFromAuthToken = (token?: string) => {
  if(!token) {
    return null;
  }
  isJwtSecretValid;
  try {
    const data = jwtInfoSchema.parse(
      jwt.verify(token, process.env.JWT_SECRET!)
    );
    return data;
  } catch (e) {
    console.log(e);
    return null;
  }
}