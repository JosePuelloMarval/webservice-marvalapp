import { Request, Response } from 'express';
import { AppDataSource } from '../../db';
import { User } from '../../entities/User';

export const allUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await AppDataSource.getRepository(User).find({
      relations: ['role'],
    });

    if (!users.length) {
      res.status(200).json({ message: 'No se encontraron usuarios' });
      return;
    }

    const transformedUsers = users.map((user) => ({
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      phone: user.phone,
      address: user.address,
      city: user.city,
      country: user.country,
      role: user.role?.role || null,
    }));

    res.json(transformedUsers);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
    return;
  }
};
