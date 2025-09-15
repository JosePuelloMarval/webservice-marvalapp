import { Request, Response } from 'express';
import { Payment } from '../../entities/Payment';

export const getPaymentsByUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const payments = await Payment.find({ where: { id: userId } });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error interno' });
  }
};
