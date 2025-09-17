import './entities/User';
import './entities/Rol';
import './entities/Profile';
import './entities/RealState';

import app from './app';
import dotenv from 'dotenv';
import { AppDataSource } from './db';

dotenv.config();
const PORT = process.env.PORT;

async function main() {
  try {
    await AppDataSource.initialize();
    app.listen(PORT);
    // eslint-disable-next-line no-console
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
}

main();
