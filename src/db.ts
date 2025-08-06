import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "mongodb",
    url: process.env.MONGO_URI,
    // host: process.env.DB_HOST || "localhost",
    // port: Number(process.env.DB_PORT) || 27017,
    // database: process.env.DB_NAME || "marvalappdb",
    useUnifiedTopology: true,
    synchronize: true,
    logging: false,
    entities: [__dirname + "/entities/*.{ts,js}"],
}); 