import { Request, Response } from "express";
import { AppDataSource } from "../../db";
import { RealState } from "../../entities/RealState";

export const createRealState = async (req: Request, res: Response): Promise<void> => {
    try {
        const { hc, name, location, price, bathrooms, area, description, imagen_url } = req.body;
        if ( !hc || !name || !location || !price || !bathrooms || !area || !description || !imagen_url ) {
            res.status(400).json({ error: "Bad request, missing data" })
            return;
        }
        const realBody = await RealState.findOne({
            where: { hc: hc }
        })
       
        if (!realBody) {
            const realRepository = AppDataSource.getRepository(RealState);
            const real = new RealState()
            real.name = name
            real.hc = hc
            real.location = location
            real.price = price
            real.bathrooms = bathrooms
            real.description = description
            real.imagen_url = imagen_url
            const createReal = await realRepository.save(real);
            res.status(201).json({ id: createReal.id });
            return;
        }
        res.status(500).json({ message: "Ya existe un proyecto inmobiliario con este hc" })
        return;
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
            return;
        }
    }
}