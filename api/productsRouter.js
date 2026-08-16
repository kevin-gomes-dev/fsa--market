import { getProduct, getProducts } from "#db/queries/productsQueries";
import express from "express";
const productsRouter = express.Router();
export default productsRouter;

productsRouter.get("/", async (req, res) => res.status(200).send(await getProducts()));
productsRouter.get("/:id/orders", async (req, res) => {
  res.status(200).send("TODO");
});
productsRouter.get("/:id", async (req, res) => {
  const product = await getProduct({ id: req.params.id });
  if (!product) return res.status(404).send("No product found.");
  return res.status(200).send(product);
});
