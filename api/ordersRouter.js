import { getOrders } from "#db/queries/ordersQueries";
import express from "express";
const ordersRouter = express.Router();
export default ordersRouter;

ordersRouter.get("/", async (req, res) => {
  res.status(200).send("TODO");
});
ordersRouter.get("/:id", async (req, res) => {
  res.status(200).send("TODO");
});
ordersRouter.get("/:id/products", async (req, res) => {
  res.status(200).send("TODO");
});
ordersRouter.post("/", async (req, res) => {
  res.status(200).send("TODO");
});
ordersRouter.post("/:id/products", async (req, res) => {
  res.status(200).send("TODO");
});
