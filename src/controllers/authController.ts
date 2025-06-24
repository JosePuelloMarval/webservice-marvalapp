import { Request, Response, NextFunction } from "express";
import { validateEmail, validatePassword } from "./validatorController/validator";
import { AppDataSource } from "../db"
import dotenv from "dotenv";

import jwt from 'jsonwebtoken';
import { Usuario } from "../entities/Usuario";
import bcrypt from "bcrypt";
import { Role } from "../entities/Rol";
import { Perfil } from "../entities/Perfil";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || "secret";

export const loginHandler = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!validateEmail(email)) {
            res.status(400).json({ message: "Email is not valid" });
            return;
        }
        if (!validatePassword(password)) {
            res.status(400).json({ message: "Password is not valid" });
            return;
        }

        const user = await AppDataSource.getRepository(Usuario)
            .createQueryBuilder()
            .innerJoin("Usuario.rol", "roles")
            .addSelect('Usuario.password')
            .addSelect('roles.nombre')
            .where("Usuario.email = :email", { email: email })
            .getOne();

        if (!user || !user.password) {
            res.status(400).json({ message: "user not found" });
            return;
        }
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) { res.status(400).json({ message: "password not valid" }) };

        const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: 60 * 60 * 24 });

        res.json({ token, user });
        return


    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};


export const signUpHandler = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, email, password, telefono } = req.body;
        if (!nombre || !email || !password || !telefono) {
            res.status(400).json({ error: "Bad request, missing data" })
            return;
        }
        const userBody = await Usuario.findOne({ where: { email: req.body.email } });

        if (userBody) {
            res.status(500).json({ message: "Ya existe un usuario con este correo" })
            return;
        }
        if (!validateEmail(email)) {
            res.status(400).json({ message: "Email is not valid" });
            return;
        }
        if (!validatePassword(password)) {
            res.status(400).json({ message: "Password is not valid" });
            return;
        }

        const rol = await Role.findOne({ where: { nombre: 'Cliente' } });
        if (!rol) {
            res.status(400).json({ error: "Bad request, Rol is invald" })
            return;
        }
        const perfil = new Perfil();
        perfil.telefono = telefono;
        const newperfil = await AppDataSource.getRepository(Perfil).save(perfil);

        const hashPassword = await bcrypt.hash(password, 10);
        const userRepository = AppDataSource.getRepository(Usuario);
        const user = new Usuario();
        user.nombre = nombre;
        user.email = email;
        user.password = hashPassword;
        user.perfil = newperfil;
        user.rol = rol
        const createUser = await userRepository.save(user);
        res.status(201).json({ id: createUser.id });

    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message })
            return;
        }
    }
}