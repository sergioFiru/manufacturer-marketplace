import { Router } from "express";
import { Category } from "../database/entities/category.model.js";

const router = Router();

router.get("/get-all", async (req, res) => {
  const categories = await Category.findAll();
  res.send(categories.map((c) => ({ id: c.id, name: c.name })));
});

router.post("/add", async (req, res) => {
  const { name } = req.body;
  const category = await Category.create({ name });
  res.send({ id: category.id, name: category.name });
});

router.put("/update", async (req, res) => {
  const { id, name } = req.body;
  await Category.update({ name }, { where: { id } });
  res.send({ success: true });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await Category.destroy({ where: { id } });
  res.send({ success: true });
});

export default router;
