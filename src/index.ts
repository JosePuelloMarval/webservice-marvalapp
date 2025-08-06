
import "./entities/User";
import "./entities/Rol";
import "./entities/Profile";
import "./entities/RealState";

import app from "./app";
import dotenv from "dotenv";
import { AppDataSource } from "./db";

dotenv.config();
const PORT = process.env.PORT || 3000;


async function main() {
    try {
        await AppDataSource.initialize();
        app.listen(PORT);
        console.log(`Server running on port ${PORT}`);
    } catch (error) {
        console.error(error);
    }
}

main();