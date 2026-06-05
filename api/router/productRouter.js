import { Router } from "express";
import { Product } from "../database/entities/product.model.js";
import { Manufacturer } from "../database/entities/manufacturer.model.js";
import { broadcast } from "../ws-server.js";

const router = Router();

router.get("/get-all", async (req, res) => {
  const rows = await Product.findAll({
    include: [{ model: Manufacturer }],
  });

  const result = rows.map((p) => ({
    id: p.id,
    name: p.name,
    status: p.status,
    price: p.price,
    manufacturerId: p.ManufacturerId,
    manufacturerName: p.Manufacturer ? p.Manufacturer.name : null,
  }));

  res.send(result);
});

router.get("/get-by-manufacturer", async (req, res) => {
  const ManufacturerId = parseInt(req.query.manufacturerId);
  const rows = await Product.findAll({ where: { ManufacturerId } });

  const result = rows.map((p) => ({
    id: p.id,
    name: p.name,
    status: p.status,
    price: p.price,
  }));

  res.send(result);
});

router.post("/add", async (req, res) => {
  const { name, price, ManufacturerId } = req.body;
  const product = await Product.create({ name, price, ManufacturerId, status: "pending" });
  broadcast({ type: "product:added", name: product.name });
  res.send({ id: product.id, name: product.name, status: product.status, price: product.price });
});

router.put("/update-status", async (req, res) => {
  const { id, status } = req.body;
  await Product.update({ status }, { where: { id } });
  res.send({ success: true });
});

router.put("/update-price", async (req, res) => {
  const { id, price } = req.body;
  await Product.update({ price }, { where: { id } });
  res.send({ success: true });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await Product.destroy({ where: { id } });
  broadcast({ type: "product:deleted", id });
  res.send({ success: true });
});

export default router;
