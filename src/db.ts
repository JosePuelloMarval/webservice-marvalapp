import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "admin123",
    database: process.env.DB_NAME || "marvalappdb",
    synchronize: process.env.E_PRODUCTION === 'true' || true,
    logging: false,
    entities: ["src/entities/*.ts"]
})