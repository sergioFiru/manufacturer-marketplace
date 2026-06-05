import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Manufacturer } from "./manufacturer.model.js";

export const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "pending",
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  },
);

Product.belongsTo(Manufacturer);
Manufacturer.hasMany(Product);
