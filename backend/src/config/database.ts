import { Sequelize } from "sequelize-typescript";
import { CONFIG } from ".";

export default new Sequelize({
  dialect: "postgres",
  host: CONFIG.DATABASE.HOST,
  port: CONFIG.DATABASE.PORT,
  database: CONFIG.DATABASE.NAME,
  username: CONFIG.DATABASE.USER,
  password: CONFIG.DATABASE.PASSWORD,
  models: [__dirname + "/../models"],
});
