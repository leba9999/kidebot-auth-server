import { Request } from "express";
import jwt from "jsonwebtoken";
import { TokenAndUser } from "../interfaces/User";

export default async (req: Request) => {
  const bearer = req.headers.authorization;
  const user = {
    token: "",
    user: {
      id: "",
      username: "",
      kideId: "",
      admin: false,
      createdAt: new Date(),
    },
  } as TokenAndUser;
  if (!bearer) {
    return user;
  }

  const token = bearer.split(" ")[1];

  if (!token) {
    return user;
  }

  const userFromToken = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as TokenAndUser;

  if (!userFromToken) {
    return user;
  }

  userFromToken.token = token;

  return userFromToken;
};
