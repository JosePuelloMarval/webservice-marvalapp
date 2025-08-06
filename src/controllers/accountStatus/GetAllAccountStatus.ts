import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { AccountStatus } from "../../entities/AccountStatus";

export const getAllAccountStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const accountStatusList = await AppDataSource.getRepository(AccountStatus).find();

        if (!accountStatusList.length) {
            res.status(200).json({ message: "No account status records found." });
            return;
        }

        res.json(accountStatusList);
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }
};
