import { Request, Response } from 'express';
import { AppDataSource } from '../../db';
import { PqrHistorySummary } from '../../entities/PqrHistorySummary';

export const getAllPqr = async (req: Request, res: Response): Promise<void> => {
  try {
    const pqrList = await AppDataSource.getRepository(PqrHistorySummary).find();

    if (!pqrList || pqrList.length === 0) {
      res.status(200).json({ message: 'No PQR records found' });
      return;
    }

    res.json(pqrList);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
};
