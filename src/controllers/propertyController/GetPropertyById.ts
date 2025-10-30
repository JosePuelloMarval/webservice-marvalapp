import { Request, Response } from 'express';
import { AppDataSource } from '../../db';
import { Property } from '../../entities/Property';

export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const property = await AppDataSource.getRepository(Property).findOneBy({
      id: id,
    });

    if (!property) {
      res.status(404).json({ message: 'Proyecto inmobiliario no encontrado' });
      return;
    }

    res.status(200).json(property);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
};
