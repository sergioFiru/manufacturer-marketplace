import { Router } from "express";
import { ContactMessage } from "../database/entities/contact.model.js";
import { Manufacturer } from "../database/entities/manufacturer.model.js";

const router = Router();

router.get("/get-all", async (req, res) => {
  const rows = await ContactMessage.findAll({
    include: [{ model: Manufacturer }],
  });

  const result = rows.map((c) => ({
    id: c.id,
    senderName: c.senderName,
    senderEmail: c.senderEmail,
    message: c.message,
    manufacturerId: c.ManufacturerId,
    manufacturerName: c.Manufacturer ? c.Manufacturer.name : null,
  }));

  res.send(result);
});

router.get("/get-by-manufacturer", async (req, res) => {
  const ManufacturerId = parseInt(req.query.manufacturerId);
  const rows = await ContactMessage.findAll({ where: { ManufacturerId } });

  const result = rows.map((c) => ({
    id: c.id,
    senderName: c.senderName,
    senderEmail: c.senderEmail,
    message: c.message,
  }));

  res.send(result);
});

router.post("/add", async (req, res) => {
  const { senderName, senderEmail, message, ManufacturerId } = req.body;
  const contact = await ContactMessage.create({ senderName, senderEmail, message, ManufacturerId });
  res.send({ id: contact.id, senderName: contact.senderName });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await ContactMessage.destroy({ where: { id } });
  res.send({ success: true });
});

export default router;
