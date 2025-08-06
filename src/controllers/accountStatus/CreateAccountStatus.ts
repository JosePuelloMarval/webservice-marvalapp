import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { AccountStatus } from "../../entities/AccountStatus";

export const createAccountStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            userId,
            projectId,
            paidAmount,
            totalAmount,
            cutOffDate,
            offerNumber,
            commitmentsPact,
            commitmentsPaid,
            commitmentsPending,
            commitmentsLate,
            lastPaymentDate,
            lastPaymentValue,
            nextCommitmentDate,
            nextCommitmentValue
        } = req.body;

        if (
            !userId || !projectId || !paidAmount || !totalAmount || !cutOffDate ||
            !offerNumber || commitmentsPact == null || commitmentsPaid == null ||
            commitmentsPending == null || commitmentsLate == null || !lastPaymentDate ||
            !lastPaymentValue || !nextCommitmentDate || !nextCommitmentValue
        ) {
            res.status(400).json({ error: "Bad request, missing data" });
            return;
        }

        const existing = await AccountStatus.findOne({
            where: { userId: userId, projectId: projectId }
        });

        if (!existing) {
            const accountStatus = new AccountStatus();
            accountStatus.userId = userId;
            accountStatus.projectId = projectId;
            accountStatus.paidAmount = paidAmount;
            accountStatus.totalAmount = totalAmount;
            accountStatus.cutOffDate = cutOffDate;
            accountStatus.offerNumber = offerNumber;
            accountStatus.commitmentsPact = commitmentsPact;
            accountStatus.commitmentsPaid = commitmentsPaid;
            accountStatus.commitmentsPending = commitmentsPending;
            accountStatus.commitmentsLate = commitmentsLate;
            accountStatus.lastPaymentDate = lastPaymentDate;
            accountStatus.lastPaymentValue = lastPaymentValue;
            accountStatus.nextCommitmentDate = nextCommitmentDate;
            accountStatus.nextCommitmentValue = nextCommitmentValue;

            const created = await AppDataSource.getRepository(AccountStatus).save(accountStatus);
            res.status(201).json({ id: created._id });
            return;
        }

        res.status(409).json({ message: "Ya existe un estado de cuenta para este usuario y proyecto" });
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }
}
