// src/lib/db/sequelize.ts
import { Sequelize } from 'sequelize';

// ⚠️ Use require here to avoid ESM/CJS default export pitfalls.
const mysql2 = require('mysql2'); // <-- key change

let db: Sequelize | null = null;

export default function getSequelize(): Sequelize {
  if (db) return db;

  const url = process.env.MYSQL_URL;
  if (!url) throw new Error('MYSQL_URL is not set');

  // prove we actually have the module we think we have
  // (these logs will show once on server boot)
  // eslint-disable-next-line no-console
  console.log('[db] mysql2 typeof:', typeof mysql2);

  db = new Sequelize(url, {
    dialect: 'mysql',
    dialectModule: mysql2,     // <-- explicitly provide the driver
    logging: false,
  });

  return db;
}
