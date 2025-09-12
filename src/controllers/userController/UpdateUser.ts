import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { User } from "../../entities/User";
import bcrypt from "bcrypt";
import { validateEmail, validatePassword } from "../validatorController/validator";
import { ObjectId } from "mongodb";

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, lastname, email, password, rol } = req.body;

        const user = await AppDataSource.getRepository(User).findOneBy({
            id: id
        });

        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        if (!validateEmail(email)) {
            res.status(400).json({ message: "Email is not valid" });
            return;
        }

        if (!validatePassword(password)) {
            res.status(400).json({ message: "Password is not valid" });
            return;
        }

        const hashPassword = await bcrypt.hash(password, 10);

        user.name = name;
        user.lastname = lastname;
        user.email = email;
        user.password = hashPassword;
        user.role.id = rol;
        await user.save();
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
