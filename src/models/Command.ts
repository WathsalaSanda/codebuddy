// src/models/Command.ts
import { DataTypes, Model, Sequelize } from 'sequelize';
import getSequelize from '@/lib/db/sequelize'; // ✅ single slash

let CommandModel: ReturnType<Sequelize['define']> | null = null;

export default function getCommand() {
  if (!CommandModel) {
    const sequelize = getSequelize();
    CommandModel = sequelize.define('Command', {
      id:       { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      username: { type: DataTypes.STRING,  allowNull: false },
      command:  { type: DataTypes.STRING,  allowNull: false },
      output:   { type: DataTypes.TEXT,    allowNull: false },
      createdAt:{ type: DataTypes.DATE,    allowNull: false, defaultValue: Sequelize.fn('NOW') },
    }, { tableName: 'commands', timestamps: false });
  }
  return CommandModel;
}
