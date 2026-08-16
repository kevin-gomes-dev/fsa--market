import { getProduct, getProducts, getUserOrdersWithProduct } from "#db/queries/productsQueries";
import express from "express";
import requireUser from "#middleware/requireUser";
const productsRouter = express.Router();
export default productsRouter;

productsRouter.get("/", async (req, res) => res.status(200).send(await getProducts()));

productsRouter.param("id", async (req, res, next) => {
  const product = await getProduct({ id: req.params.id });
  if (!product) return res.status(404).send("No product found with id " + req.params.id);
  req.product = product;
  next();
});
productsRouter.get("/:id/orders", requireUser, async (req, res) => {
  const params = { userId: req.user.id, productId: req.params.id };
  const orders = await getUserOrdersWithProduct(params);
  return res.status(200).send(orders);
});
productsRouter.get("/:id", async (req, res) => {
  const product = await getProduct({ id: req.params.id });
  if (!product) return res.status(404).send("No product found.");
  return res.status(200).send(product);
});
