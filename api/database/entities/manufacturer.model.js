import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Category } from "./category.model.js";

export const Manufacturer = sequelize.define(
  "Manufacturer",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  },
);

Manufacturer.belongsTo(Category);
Category.hasMany(Manufacturer);
