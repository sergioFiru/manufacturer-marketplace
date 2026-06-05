import { Router } from "express";
import { User } from "../database/entities/user.model.js";

const router = Router();

router.get("/get-all", async (req, res) => {
  const rows = await User.findAll();
  const result = rows.map((u) => ({
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role,
    status: u.status,
  }));
  res.send(result);
});

router.post("/add", async (req, res) => {
  const { name, email, role } = req.body;
  const user = await User.create({ name, email, role, status: "pending" });
  res.send({ id: user.id, name: user.name, email: user.email, role: user.role, status: user.status });
});

router.put("/update-status", async (req, res) => {
  const { id, status } = req.body;
  await User.update({ status }, { where: { id } });
  res.send({ success: true });
});

router.delete("/delete", async (req, res) => {
  const { id } = req.body;
  await User.destroy({ where: { id } });
  res.send({ success: true });
});

export default router;
