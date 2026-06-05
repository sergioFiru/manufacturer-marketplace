import { sequelize } from "./db.js";
import bcrypt from "bcryptjs";

import "./entities/category.model.js";
import "./entities/manufacturer.model.js";
import "./entities/detail.model.js";
import "./entities/product.model.js";
import "./entities/user.model.js";
import "./entities/contact.model.js";
import { User } from "./entities/user.model.js";

await sequelize.sync({ alter: true }).then(async () => {
  const adminHash = await bcrypt.hash("admin123", 10);
  const [admin, created] = await User.findOrCreate({
    where: { username: "admin" },
    defaults: {
      name: "Administrator",
      username: "admin",
      password: adminHash,
      email: "admin@example.com",
      role: "admin",
    },
  });
  if (!created) {
    await admin.update({ role: "admin", password: adminHash });
  }

  console.log("FINISHED SUCCESS");
  process.exit(0);
});
