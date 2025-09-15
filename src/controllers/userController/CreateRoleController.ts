import { Request, Response } from 'express';
import { AppDataSource } from '../../db';
import { Role } from '../../entities/Rol';

export const createRole = async (req: Request, res: Response): Promise<void> => {
  try {
    const { rol } = req.body;
    if (!rol) {
      res.status(400).json({ error: 'Bad request, missing data - create project' });
      return;
    }
    const roleBody = await Role.findOne({
      where: { role: req.body.role },
    });

    if (!roleBody) {
      const roleRepository = AppDataSource.getRepository(Role);
      const role = new Role();
      role.role = rol;
      const createRole = await roleRepository.save(role);
      res.status(201).json({ id: createRole.id });
      return;
    }
    res.status(500).json({ message: 'Ya existe un role con este nombre' });
    return;
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    }
  }
};
