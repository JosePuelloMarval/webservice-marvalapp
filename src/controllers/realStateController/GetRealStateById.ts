import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { RealState } from "../../entities/RealState";
import { ObjectId } from "mongodb";

export const getRealStateById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const realState = await AppDataSource.getRepository(RealState).findOneBy({
            _id: new ObjectId(id)
        });

        console.log(realState, " aca esta el proyecto")

        if (!realState) {
            res.status(404).json({ message: "Proyecto inmobiliario no encontrado" });
            return;
        }

        res.status(200).json(realState);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
            return;
        }
    }
};
