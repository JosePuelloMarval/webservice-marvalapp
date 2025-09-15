import { Request, Response } from 'express';
import { AppDataSource } from '../../db';
import { AccountStatus } from '../../entities/AccountStatus';

export const getAccountStatusById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const accountStatus = await AppDataSource.getRepository(AccountStatus).findOneBy({
      id: id,
    });

    if (!accountStatus) {
      res.status(404).json({ message: 'AccountStatus not found' });
      return;
    }

    res.status(200).json(accountStatus);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
};
