import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { PqrHistorySummary } from "../../entities/PqrHistorySummary";

export const createPqrHistorySummary = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            caseNumber,
            subject,
            status,
            timestamp,
            last_message_preview,
            userId
        } = req.body;

        if (!caseNumber || !subject || !status || !timestamp || !last_message_preview || !userId) {
            res.status(400).json({ error: "Bad request, missing data" });
            return;
        }

        const existing = await PqrHistorySummary.findOne({
            where: { caseNumber }
        });

        if (!existing) {
            const pqr = new PqrHistorySummary();
            pqr.caseNumber = caseNumber;
            pqr.subject = subject;
            pqr.status = status;
            pqr.timestamp = timestamp;
            pqr.last_message_preview = last_message_preview;
            pqr.userId = userId;

            const created = await AppDataSource.getRepository(PqrHistorySummary).save(pqr);
            res.status(201).json({ id: created._id });
            return;
        }

        res.status(409).json({ message: "Ya existe un PQR con ese número de caso" });
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }
}
