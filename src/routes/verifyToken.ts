import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = (authHeader as string).split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC as string, (err: any, user: any) => {
      if (err) {
        res.status(403).json("Invalid or expired token.");
      }
      req.body.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated.");
  }
};

const verifyTokenAndAuthorization = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.body.user.id === req.params.id || req.body.user.isAdmin) {
      next();
    } else {
      res.status(402).json("You are not allowed to do that.");
    }
  });
};

const verifyTokenAndAdmin = (req: Request, res: Response, next: NextFunction) => {
  verifyToken(req, res, () => {
    if (req.body.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You are not allowed to do that.");
    }
  });
};

export { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin };