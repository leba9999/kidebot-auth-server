import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import userModel from "../models/userModel";
import CustomError from "../../classes/CustomError";
import LoginResponse from "../../interfaces/Responses/LoginResponse";
import { OutputUser } from "../../interfaces/User";

const token = async (
  req: Request<{}, {}, { kideId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = (await userModel.findOne({
      kideId: req.body.kideId,
    })) as OutputUser;
    if (!user) {
      next(new CustomError("User not found", 404));
      return;
    }
    let expiresIn = 86400000 * 2; // 2 days
    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        kideId: user.kideId,
        admin: user.admin,
        createdAt: user.createdAt,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: expiresIn.toString(),
      }
    );
    const message: LoginResponse = {
      message: "Token created",
      token: accessToken,
      user: user,
    };
    res.json(message);
  } catch (error) {
    console.log(error);
    next(new CustomError((error as Error).message, 500));
  }
};

export { token };
