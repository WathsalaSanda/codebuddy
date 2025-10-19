import { Sequelize } from "sequelize";

let _sequelize: Sequelize | null = null;

export default function getSequelize(): Sequelize {
  if (!_sequelize) {
    _sequelize = new Sequelize(
      process.env.MYSQL_URL || "mysql://root:password@localhost:3306/codebuddy",
      { logging: false }
    );
  }
  return _sequelize;
}
