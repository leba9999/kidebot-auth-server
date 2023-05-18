import { Request } from "express";
import jwt from "jsonwebtoken";
import { OutputUser, TokenAndUser } from "../interfaces/User";

export default async (req: Request) => {
  const bearer = req.headers.authorization;
  const authorization = {
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
    return authorization;
  }

  const token = bearer.split(" ")[1];

  if (!token) {
    return authorization;
  }

  authorization.user = jwt.verify(
    token,
    process.env.JWT_SECRET as string
  ) as OutputUser;

  if (!authorization.user) {
    return authorization;
  }

  authorization.token = token;

  return authorization;
};
