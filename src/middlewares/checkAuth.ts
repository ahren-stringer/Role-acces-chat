import express from "express";
import verifyJWTToken from "../utils/verifyJWT";
import { DecodedData } from "../utils/verifyJWT";
import { IUser } from "../models/User";

export default (
  req: any,
  res: express.Response,
  next: express.NextFunction
): void => {
  if (
    req.path === "/user/signin" ||
    req.path === "/user/signup" ||
    req.path === "/user/verify"
  ) {
    return next();
  }

  const token: string | null =
    "token" in req.headers ? (req.headers.token as string) : null;

  if (token) {
    verifyJWTToken(token)
      .then((user) => {
        if (user) {
          req.user = user;
        }
        next();
      })
      .catch(() => {
        res.status(403).json({ message: "Invalid auth token provided." });
      });
  }
};