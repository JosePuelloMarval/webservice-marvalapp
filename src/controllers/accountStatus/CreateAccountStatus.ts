import { Request, Response } from 'express';
import { AppDataSource } from '../../db';
import { AccountStatus } from '../../entities/AccountStatus';

export const createAccountStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      userId,
      realStateId,
      totalAmount,
      initialOwnResources,
      initialSpecialResources,
      financeOtherEntities,
      cutOffDate,
      offerNumber,
      commitmentsPact,
      commitmentsPactValue,
      commitmentsPaid,
      commitmentsPending,
      commitmentsPendingValue,
      commitmentsLateValue,
      lastPaymentDate,
      lastPaymentValue,
      nextCommitmentDate,
      nextCommitmentValue,
      interestLate,
      writingExpenses,
      pendingBalance,
      paymentDeadline,
    } = req.body;

    if (
      !userId ||
      !realStateId ||
      totalAmount == null ||
      initialOwnResources == null ||
      initialSpecialResources == null ||
      financeOtherEntities == null ||
      !cutOffDate ||
      !offerNumber ||
      commitmentsPact == null ||
      commitmentsPactValue == null ||
      commitmentsPaid == null ||
      commitmentsPending == null ||
      commitmentsPendingValue == null ||
      commitmentsLateValue == null ||
      !lastPaymentDate ||
      lastPaymentValue == null ||
      !nextCommitmentDate ||
      nextCommitmentValue == null ||
      interestLate == null ||
      writingExpenses == null ||
      pendingBalance == null ||
      !paymentDeadline
    ) {
      res.status(400).json({ error: 'Bad request, missing data' });
      return;
    }

    // Verifica si ya existe para ese usuario e inmueble
    const existing = await AppDataSource.getRepository(AccountStatus).findOne({
      where: {

      },
    });

    if (existing) {
      res
        .status(409)
        .json({ message: 'Ya existe un estado de cuenta para este usuario y proyecto' });
      return;
    }

    const accountStatus = new AccountStatus();
    accountStatus.userIds = userId;
    accountStatus.realState = realStateId;
    accountStatus.totalAmount = totalAmount;
    accountStatus.initialOwnResources = initialOwnResources;
    accountStatus.initialSpecialResources = initialSpecialResources;
    accountStatus.financeOtherEntities = financeOtherEntities;
    accountStatus.cutOffDate = new Date(cutOffDate);
    accountStatus.offerNumber = offerNumber;
    accountStatus.commitmentsPact = commitmentsPact;
    accountStatus.commitmentsPactValue = commitmentsPactValue;
    accountStatus.commitmentsPaid = commitmentsPaid;
    accountStatus.commitmentsPending = commitmentsPending;
    accountStatus.commitmentsPendingValue = commitmentsPendingValue;
    accountStatus.commitmentsLateValue = commitmentsLateValue;
    accountStatus.lastPaymentDate = new Date(lastPaymentDate);
    accountStatus.lastPaymentValue = lastPaymentValue;
    accountStatus.nextCommitmentDate = new Date(nextCommitmentDate);
    accountStatus.nextCommitmentValue = nextCommitmentValue;
    accountStatus.interestLate = interestLate;
    accountStatus.writingExpenses = writingExpenses;
    accountStatus.pendingBalance = pendingBalance;
    accountStatus.paymentDeadline = new Date(paymentDeadline);

    const created = await AppDataSource.getRepository(AccountStatus).save(accountStatus);

    res.status(201).json({ id: created.id });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};
