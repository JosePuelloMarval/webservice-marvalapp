import { Request, Response } from 'express';
import { AppDataSource } from '../../db';
import { RealState } from '../../entities/RealState';

export const allRealState = async (req: Request, res: Response): Promise<void> => {
  try {
    const realstate = await AppDataSource.getRepository(RealState).find();
    if (realstate.length > 0) {
      res.json(realstate);
    } else {
      res.status(200).json({ message: 'No se encontraron proyectos inmobiliarios ' });
    }
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
    return;
  }
};
