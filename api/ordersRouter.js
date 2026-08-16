import {
  getOrder,
  getOrders,
  getProductsFromOrder,
  insertOrder,
  insertProductIntoOrder,
} from "#db/queries/ordersQueries";
import { getProduct } from "#db/queries/productsQueries";
import requireBody from "#middleware/requireBody";
import express from "express";
const ordersRouter = express.Router();
export default ordersRouter;

ordersRouter.get("/", async (req, res) => {
  return res.status(200).send(await getOrders({ userId: req.user.id }));
});

ordersRouter.post("/", requireBody(["date"]), async (req, res) => {
  const order = { date: req.body.date, note: req.body.note, userId: req.user.id };
  return res.status(201).send(await insertOrder(order));
});

ordersRouter.param("id", async (req, res, next) => {
  const order = await getOrder({ id: req.params.id });
  if (!order) return res.status(404).send("Order not found with id " + req.params.id);
  if (order.user_id !== req.user.id) return res.status(403).send("Accessing unowned order.");
  req.order = order;
  next();
});

ordersRouter.get("/:id", async (req, res) => {
  return res.status(200).send(req.order);
});

ordersRouter.get("/:id/products", async (req, res) => {
  return res.status(200).send(await getProductsFromOrder({ id: req.order.id }));
});

ordersRouter.post("/:id/products", requireBody(["productId", "quantity"]), async (req, res) => {
  const product = await getProduct({ id: req.body.productId });
  if (!product) return res.status(400).send("No product found with id " + req.body.productId);
  const orderProduct = {
    orderId: req.order.id,
    productId: product.id,
    quantity: req.body.quantity,
  };
  res.status(201).send(await insertProductIntoOrder(orderProduct));
});
