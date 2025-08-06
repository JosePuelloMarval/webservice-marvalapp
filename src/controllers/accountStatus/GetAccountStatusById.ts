import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { AccountStatus } from "../../entities/AccountStatus";
import { ObjectId } from "mongodb";

export const getAccountStatusById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const accountStatus = await AppDataSource.getRepository(AccountStatus).findOneBy({
            _id: new ObjectId(id)
        });

        if (!accountStatus) {
            res.status(404).json({ message: "AccountStatus not found" });
            return;
        }

        res.json(accountStatus);
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }
}
