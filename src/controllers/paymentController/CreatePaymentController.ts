import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { Payment } from "../../entities/Payment";
import { AccountStatus } from "../../entities/AccountStatus";
import { ObjectId } from "mongodb";

export const createPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { accountStatusId, userId, amount, paymentDate, paymentMethod, reference } = req.body;

        if (!accountStatusId || !userId || !amount || !paymentDate || !paymentMethod || !reference) {
            res.status(400).json({ error: "Faltan datos obligatorios" });
            return;
        }

        const accountStatus = await AccountStatus.findOne({ where: { _id: new ObjectId(accountStatusId) } });
        if (!accountStatus) {
            res.status(404).json({ error: "Estado de cuenta no encontrado" });
            return;
        }

        const payment = new Payment();
        payment.accountStatusId = new ObjectId(accountStatusId);
        payment.userId = new ObjectId(userId);
        payment.amount = amount;
        payment.paymentDate = new Date(paymentDate);
        payment.paymentMethod = paymentMethod;
        payment.reference = reference;

        await AppDataSource.getRepository(Payment).save(payment);

        // Actualizamos último pago en el estado de cuenta
        accountStatus.lastPaymentDate = new Date(paymentDate);
        accountStatus.lastPaymentValue = amount;
        accountStatus.commitmentsPaid = (accountStatus.commitmentsPaid || 0) + 1;
        accountStatus.commitmentsPending = Math.max((accountStatus.commitmentsPending || 0) - 1, 0);
        accountStatus.pendingBalance = Math.max((accountStatus.pendingBalance || 0) - amount, 0);

        await AppDataSource.getRepository(AccountStatus).save(accountStatus);

        res.status(201).json({ message: "Pago registrado correctamente", id: payment._id });
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : "Error interno" });
    }
};
