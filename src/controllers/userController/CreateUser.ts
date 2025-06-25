import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { User } from "../../entities/User";
import bcrypt from "bcrypt";
import { validateEmail, validatePassword } from "../validatorController/validator";

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, lastname, email, rol, password } = req.body;
        if (!name || !lastname || !email || !rol || !password ) {
            res.status(400).json({ error: "Bad request, missing data" })
            return;
        }
        const userBody = await User.findOne({
            where: { email: req.body.email }
        })
        if (!validateEmail(email)) {
            res.status(400).json({ message: "Email is not valid" });
            return;
        }
        if (!validatePassword(password)) {
            res.status(400).json({ message: "Password is not valid" });
            return;
        }
        const hashPassword = await bcrypt.hash(password, 10);
        if (!userBody) {
            const userRepository = AppDataSource.getRepository(User);
            const user = new User()
            user.name = name
            user.lastname = lastname
            user.email = email
            user.password = hashPassword
            user.role = rol
            const createUser = await userRepository.save(user);
            res.status(201).json({ id: createUser.id });
            return;
        }
        res.status(500).json({ message: "Ya existe un usuario con este correo" })
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
            return;
        }
    }
}