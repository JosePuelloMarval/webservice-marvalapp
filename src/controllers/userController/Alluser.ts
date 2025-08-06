import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { User } from "../../entities/User";

export const allUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await AppDataSource.getRepository(User).find()
        users.length ?
            res.json(users) :
            res.status(200).json({ message: "No se encontraron usuarios" });
        return;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
        return;
    }
}
