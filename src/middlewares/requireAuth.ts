import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || "secret";

export const requireAuth = (req: Request, res: Response, next: NextFunction): void => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        if (!authHeader.startsWith("Marval-App ")) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        jwt.verify(token, SECRET_KEY , (err, user) => {
            if (err) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }
            req.body.user = user
            next()
        })
    } catch (error) {
        next(error);
    }
}