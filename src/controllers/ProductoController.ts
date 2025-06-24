import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Producto } from "../entities/Producto";

export const allProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const producto = await AppDataSource.getRepository(Producto).find()
        producto.length ?
            res.json(producto) :
            res.status(200).json({ message: "No se encontraron usuarios" });

        return;
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            res.status(500).json({ message: error.message });
        }
        return;
    }
}
