import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { User } from "../../entities/User";

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await AppDataSource.getRepository(User).findOne({
            where: { id: id },
            relations: ['rol', 'profile']
        })
        res.json(user);
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }

    }
}