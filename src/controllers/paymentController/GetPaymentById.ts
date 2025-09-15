import { Request, Response } from 'express';
import { Payment } from '../../entities/Payment';

export const getPaymentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const payment = await Payment.findOne({ where: { id: id } });

    if (!payment) {
      res.status(404).json({ error: 'Pago no encontrado' });
      return;
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error interno' });
  }
};
