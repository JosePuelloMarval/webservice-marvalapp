import { Request, Response } from 'express';
import { AppDataSource } from '../../db';
import { Property } from '../../entities/Property';

export const allProperty = async (req: Request, res: Response): Promise<void> => {
  try {
    const property = await AppDataSource.getRepository(Property).find();
    if (property.length > 0) {
      res.json(property);
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
