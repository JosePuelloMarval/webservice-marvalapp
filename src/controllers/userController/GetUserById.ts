import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { User } from "../../entities/User";
import { AccountStatus } from "../../entities/AccountStatus";

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const user = await AppDataSource.getRepository(User).findOneBy({
           id : id
        })
        const accountStatus = await AppDataSource.getRepository(AccountStatus).findOneBy({
            id: user?.id
        });
        res.json({
            ...user,
            accountStatus
        });
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }

    }
}