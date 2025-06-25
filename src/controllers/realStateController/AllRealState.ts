import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { RealState } from "../../entities/RealState";

export const allRealState = async (req: Request, res: Response): Promise<void> => {
    try {
        const realstate = await AppDataSource.getRepository(RealState).find()
        realstate.length ?
            res.json(realstate) :
            res.status(200).json({ message: "No se encontraron proyectos inmobiliarios " });

        return;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
        return;
    }
}
