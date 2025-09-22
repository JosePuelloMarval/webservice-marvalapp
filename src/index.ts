import './entities/Rol';
import './entities/Profile';
import './entities/RealState';

import app from './app';
import dotenv from 'dotenv';
import { AppDataSource } from './db';

dotenv.config();

// Siempre aseguramos que sea un número
const PORT = Number(process.env.PORT) || 5000;


async function main() {
  try {
    await AppDataSource.initialize();
    app.listen(PORT,() => {
      // eslint-disable-next-line no-console
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("❌ Error initializing app:", error);
  }
}

main();

