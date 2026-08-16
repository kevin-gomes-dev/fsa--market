import express from "express";
import requireBody from "#middleware/requireBody";
import { getUserByUsername, insertUser } from "#db/queries/usersQueries";
import { createToken } from "#utils/jwt";
const usersRouter = express.Router();
export default usersRouter;

usersRouter.post("/register", requireBody(["username", "password"]), async (req, res) => {
  const user = await insertUser({ username: req.body.username, password: req.body.password });
  const token = createToken({ id: user.id });
  return res.status(201).send(token);
});

usersRouter.post("/login", requireBody(["username", "password"]), async (req, res) => {
  const user = await getUserByUsername({
    username: req.body.username,
    password: req.body.password,
  });
  // Could be no user exists or wrong creds, either way do not hint
  if (!user) return res.status(401).send("Invalid credentials");
  const token = createToken({ id: user.id });
  return res.status(200).send(token);
});
