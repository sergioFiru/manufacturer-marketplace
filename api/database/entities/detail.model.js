import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Manufacturer } from "./manufacturer.model.js";

export const ManufacturerDetail = sequelize.define(
  "ManufacturerDetail",
  {
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    foundedYear: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  },
);

Manufacturer.hasOne(ManufacturerDetail);
ManufacturerDetail.belongsTo(Manufacturer);
