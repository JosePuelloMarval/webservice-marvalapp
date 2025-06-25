import { Request, Response } from "express";
import { validateEmail, validatePassword } from "../validatorController/validator";
import { AppDataSource } from "../../db"
import dotenv from "dotenv";

import jwt from 'jsonwebtoken';
import { User } from "../../entities/User";
import bcrypt from "bcrypt";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "secret";

export const loginHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!validateEmail(email)) {
            res.status(400).json({ message: "Email is not valid" });
            return;
        }
        if (!validatePassword(password)) {
            res.status(400).json({ message: "Password is not valid" });
            return;
        }

        const user = await AppDataSource.getRepository(User)
            .createQueryBuilder()
            .innerJoin("User.rol", "roles")
            .addSelect('User.password')
            .addSelect('roles.nombre')
            .where("User.email = :email", { email: email })
            .getOne();

        if (!user || !user.password) {
            res.status(400).json({ message: "user not found" });
            return;
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) { res.status(400).json({ message: "password not valid" }) };

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: 60 * 60 * 24 });

        res.json({ token, user });
        return


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};