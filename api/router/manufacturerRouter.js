import { Router } from "express";
import { Manufacturer } from "../database/entities/manufacturer.model.js";
import { ManufacturerDetail } from "../database/entities/detail.model.js";
import { Category } from "../database/entities/category.model.js";
import { sequelize } from "../database/db.js";
import { broadcast } from "../ws-server.js";

const router = Router();

router.get("/get-all", async (req, res) => {
  const rows = await Manufacturer.findAll({
    include: [{ model: Category }],
  });

  const result = rows.map((m) => ({
    id: m.id,
    name: m.name,
    description: m.description,
    location: m.location,
    category: m.Category ? m.Category.name : null,
  }));

  res.send(result);
});

router.get("/get-by-id", async (req, res) => {
  const id = parseInt(req.query.id);
  const m = await Manufacturer.findByPk(id, {
    include: [{ model: Category }, { model: ManufacturerDetail }],
  });

  if (!m) return res.status(404).send({ error: "Not found" });

  res.send({
    id: m.id,
    name: m.name,
    description: m.description,
    location: m.location,
    category: m.Category ? m.Category.name : null,
    detail: m.ManufacturerDetail || null,
  });
});

router.get("/get-by-category", async (req, res) => {
  const CategoryId = parseInt(req.query.categoryId);
  const rows = await Manufacturer.findAll({
    where: { CategoryId },
    include: [{ model: Category }],
  });

  const result = rows.map((m) => ({
    id: m.id,
    name: m.name,
    description: m.description,
    location: m.location,
    category: m.Category ? m.Category.name : null,
  }));

  res.send(result);
});

router.post("/add", async (req, res) => {
  const { name, description, location, CategoryId, phone, website, foundedYear } = req.body;

  const t = await sequelize.transaction();
  try {
    const manufacturer = await Manufacturer.create(
      { name, description, location, CategoryId },
      { transaction: t },
    );

    const detail = await ManufacturerDetail.create(
      { phone, website, foundedYear, ManufacturerId: manufacturer.id },
      { transaction: t },
    );

    await t.commit();

    broadcast({ type: "manufacturer:added", name: manufacturer.name });

    res.send({
      id: manufacturer.id,
      name: manufacturer.name,
      description: manufacturer.description,
      location: manufacturer.location,
      detail: { phone: detail.phone, website: detail.website, foundedYear: detail.foundedYear },
    });
  } catch (error) {
    await t.rollback();
    console.error("Error creating manufacturer:", error);
    res.status(500).send({ error: "Failed to create manufacturer" });
  }
});

router.put("/update", async (req, res) => {
  const { id, name, description, location, CategoryId } = req.body;
  await Manufacturer.update({ name, description, location, CategoryId }, { where: { id } });
  res.send({ success: true });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await Manufacturer.destroy({ where: { id } });
  broadcast({ type: "manufacturer:deleted", id });
  res.send({ success: true });
});

export default router;
