import express from "express";
import morgan from "morgan";
import ordersRouter from "#api/ordersRouter";
import productsRouter from "#api/productsRouter";
import usersRouter from "#api/usersRouter";
import getUserFromToken from "#middleware/getUserFromToken";
import requireUser from "#middleware/requireUser";
const app = express();
export default app;

const FOREIGN_KEY_VIOLATION_CODE = "23503";
const UNIQUE_CONSTRAINT_VIOLATION_CODE = "23505";
const INVALID_TYPE_CODE = "22P02";

app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) =>
  res.status(200).send(
    `Endpoints, default is GET: (POST) /users/[register,login]
      /products[/:id,(PROTECTED) -> /:id/orders]
      (ALL PROTECTED) (POST) /orders[/:id,(POST, GET) /:id/products]
      `,
  ),
);
// Possibly attach user as req.user, if no or invalid form token, req.user = null else 401 err
app.use(getUserFromToken);

app.use("/orders", requireUser, ordersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);

// SQL errors
app.use((err, req, res, next) => {
  switch (err.code) {
    // Invalid type
    case INVALID_TYPE_CODE:
      return res.status(400).send(err.message);
    // Unique constraint violation
    case UNIQUE_CONSTRAINT_VIOLATION_CODE:
    // Foreign key violation
    case FOREIGN_KEY_VIOLATION_CODE:
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

// Unknown error fallback if all else fails
app.use((err, req, res, next) => {
  console.log(err);
  return res.status(500).send("Some unknown error happened. See log");
});
