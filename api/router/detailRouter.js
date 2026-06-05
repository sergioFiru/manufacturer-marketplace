import { Router } from "express";
import { ManufacturerDetail } from "../database/entities/detail.model.js";

const router = Router();

router.get("/get-by-manufacturer", async (req, res) => {
  const ManufacturerId = parseInt(req.query.manufacturerId);
  const detail = await ManufacturerDetail.findOne({ where: { ManufacturerId } });
  if (!detail) return res.status(404).send({ error: "Not found" });
  res.send({ id: detail.id, phone: detail.phone, website: detail.website, foundedYear: detail.foundedYear });
});

router.post("/add", async (req, res) => {
  const { phone, website, foundedYear, ManufacturerId } = req.body;
  const detail = await ManufacturerDetail.create({ phone, website, foundedYear, ManufacturerId });
  res.send({ id: detail.id, phone: detail.phone, website: detail.website, foundedYear: detail.foundedYear });
});

router.put("/update", async (req, res) => {
  const { id, phone, website, foundedYear } = req.body;
  await ManufacturerDetail.update({ phone, website, foundedYear }, { where: { id } });
  res.send({ success: true });
});

export default router;
