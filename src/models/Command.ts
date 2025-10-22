import { DataTypes, Sequelize } from "sequelize";
import getSequelize from "@/lib/db/sequelize";

// cache the model so it isn't redefined on hot reloads
let CommandModel: ReturnType<Sequelize["define"]> | null = null;

export default function getCommand() {
  if (!CommandModel) {
    const sequelize = getSequelize();

    CommandModel = sequelize.define(
      "Command",
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },

        // JS property "username" -> DB column "github_username"
        username: {
          type: DataTypes.STRING(100),
          allowNull: false,
          field: "github_username",
        },

        // JS property "command" -> DB column "git_command"
        command: {
          type: DataTypes.STRING(200),
          allowNull: false,
          field: "git_command",
        },

        // same name in DB
        output: {
          type: DataTypes.TEXT,
          allowNull: false,
          field: "output",
        },

        // map createdAt to created_at; we are not using Sequelize timestamps
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          field: "created_at",
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        },
      },
      {
        tableName: "commands",  // important: use existing table
        timestamps: false,       // because table already has created_at only
      }
    );
  }
  return CommandModel;
}
