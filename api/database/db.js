import { Sequelize } from "sequelize";

const db = {
  NAME: "marketplace",
  USERNAME: "root",
  PASSWORD: "root",

  options: {
    dialect: "mysql",
    timezone: "+00:00",
    host: "localhost",
    port: 3306,
    logging: function (str) {
      console.log(str);
    },
  },
};

export const sequelize = new Sequelize(
  db.NAME,
  db.USERNAME,
  db.PASSWORD,
  db.options,
);
