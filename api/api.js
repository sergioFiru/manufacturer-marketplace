import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import categoryRouter from "./router/categoryRouter.js";
import manufacturerRouter from "./router/manufacturerRouter.js";
import productRouter from "./router/productRouter.js";
import userRouter from "./router/userRouter.js";
import contactRouter from "./router/contactRouter.js";
import detailRouter from "./router/detailRouter.js";
import authRouter from "./router/authRouter.js";
import authMiddleware from "./middleware/authMiddleware.js";
import "./ws-server.js";

const api = express();
const port = 3000;

api.use(bodyParser.json());

api.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

api.use("/auth", authRouter);
api.use("/category", categoryRouter);
api.use("/contact", contactRouter);
api.use("/detail", detailRouter);
api.use("/manufacturer", manufacturerRouter);
api.use("/product", productRouter);
api.use("/user", authMiddleware, userRouter);

api.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
