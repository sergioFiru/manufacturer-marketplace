import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";
import { Manufacturer } from "./manufacturer.model.js";

export const ContactMessage = sequelize.define(
  "ContactMessage",
  {
    senderName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    senderEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    paranoid: true,
  },
);

ContactMessage.belongsTo(Manufacturer);
Manufacturer.hasMany(ContactMessage);
