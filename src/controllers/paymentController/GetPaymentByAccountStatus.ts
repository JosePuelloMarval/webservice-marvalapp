import { Request, Response } from 'express';
import { Payment } from '../../entities/Payment';

export const getPaymentsByAccountStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const { accountStatusId } = req.params;
    const payments = await Payment.find({ where: { id: accountStatusId } });

    res.json(payments);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error interno' });
  }
};
