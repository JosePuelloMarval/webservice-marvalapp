import { Request, Response } from 'express';
import { validateEmail, validatePassword } from '../validatorController/validator';
import { AppDataSource } from '../../db';
import dotenv from 'dotenv';

import jwt from 'jsonwebtoken';
import { User } from '../../entities/User';
import { AccountStatus } from '../../entities/AccountStatus';
import bcrypt from 'bcrypt';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

export const loginHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (!validateEmail(email)) {
      res.status(400).json({ message: 'Email is not valid' });
      return;
    }

    if (!validatePassword(password)) {
      res.status(400).json({ message: 'Password is not valid' });
      return;
    }

    const user = await AppDataSource.getRepository(User).findOne({
      where: { email }, 
      relations: ["role"]
    });

    console.log(user, " aca user")

    if (!user || !user?.password) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(400).json({ message: 'Password not valid' });
      return;
    }

  
  
    let accountStatus: AccountStatus | null = null;

    if (user.accountStatuses) {
      accountStatus = await AppDataSource.getRepository(AccountStatus).findOneBy({
        id: user.id,
      });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
      expiresIn: 60 * 60 * 24,
    });

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city: user.city,
        country: user.country,
        role: user.role?.role || null,
        accountStatus: accountStatus || null,
      },
    });
    return;
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error interno' });
    return;
  }
};
