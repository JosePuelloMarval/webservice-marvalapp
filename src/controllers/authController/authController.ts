import { Request, Response } from "express";
import { validateEmail, validatePassword } from "../validatorController/validator";
import { AppDataSource } from "../../db";
import dotenv from "dotenv";

import jwt from "jsonwebtoken";
import { User } from "../../entities/User";
import { Role } from "../../entities/Rol";
import bcrypt from "bcrypt";
import { ObjectId } from "mongodb";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "secret";

export const loginHandler = async (req: Request, res: Response): Promise<void> => {
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

        // 🔍 Buscar usuario por email
        const user = await AppDataSource.getRepository(User).findOne({
            where: { email },
            select: { password: true, email: true, name: true, lastname: true, roleId: true } // Incluye password manualmente
        });

        if (!user || !user.password) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            res.status(400).json({ message: "Password not valid" });
            return;
        }

        // 🔍 Obtener rol del usuario
        let role: Role | null = null;
        if (user.roleId) {
            role = await AppDataSource.getRepository(Role).findOneBy({ _id: new ObjectId(user.roleId) });
        }

        // 🔐 Generar token
        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: 60 * 60 * 24 });

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                lastname: user.lastname,
                email: user.email,
                role: role?.role || null
            }
        });
        return;

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};
