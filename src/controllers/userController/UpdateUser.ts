import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { User } from "../../entities/User";
import bcrypt from "bcrypt";
import { validateEmail, validatePassword } from "../validatorController/validator";

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params
        const { name, lastname, email, password, rol } = req.body;
        const user = await await AppDataSource.getRepository(User).findOne({
            where: { id: id },
            relations: ['rol']
        });
        if (!user) {
            res.status(404).json({ message: "User not found" })
            return;
        }
        if (!validatePassword) {
            res.status(400).json({ message: "Password is not valid" })
            return;
        }
        const hashPassword = await bcrypt.hash(password, 10);
        user.name = name;
        user.lastname = lastname;
        user.email = email;
        user.password = hashPassword;
        user.role = rol;

        await user.save();
        res.sendStatus(200);
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
            return;
        }
    }
}
