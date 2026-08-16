import express from "express";
const usersRouter = express.Router();
export default usersRouter;

usersRouter.post("/register", async (req, res) => {
  res.status(200).send("TODO");
});
usersRouter.post("/login", async (req, res) => {
  res.status(200).send("TODO");
});
