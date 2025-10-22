// src/lib/db/sequelize.ts
import { Sequelize } from 'sequelize';

// IMPORTANT: grab the CommonJS export
// (Sequelize expects what `require('mysql2')` returns)
import * as mysql2 from 'mysql2';

let db: Sequelize | null = null;

export default function getSequelize(): Sequelize {
  if (db) return db;

  const url = process.env.MYSQL_URL;
  if (!url) {
    throw new Error('MYSQL_URL is not set');
  }

  db = new Sequelize(url, {
    dialect: 'mysql',
    // force Sequelize to use the driver we provide, no dynamic require:
    dialectModule: mysql2,
    logging: false,
  });

  return db;
}
