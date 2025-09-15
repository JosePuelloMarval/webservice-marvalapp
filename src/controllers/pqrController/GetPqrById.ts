import { Request, Response } from 'express';
import { AppDataSource } from '../../db';
import { PqrHistorySummary } from '../../entities/PqrHistorySummary';

export const getPqrById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const pqr = await AppDataSource.getRepository(PqrHistorySummary).findOneBy({
      id: id,
    });

    if (!pqr) {
      res.status(404).json({ message: 'PQR not found' });
      return;
    }

    res.json(pqr);
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
};
