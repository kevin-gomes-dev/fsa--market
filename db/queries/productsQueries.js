import db from "#db/client";

export async function getProducts() {
  const SQL = `SELECT * FROM products`;
  const { rows: products } = await db.query(SQL);
  return products;
}

export async function getProduct({ id }) {
  const SQL = `SELECT * FROM products WHERE id = $1`;
  const {
    rows: [product],
  } = await db.query(SQL, [id]);
  return product;
}

export async function insertProduct({ title, description, price }) {
  const SQL = `INSERT INTO products(title,description,price) VALUES ($1,$2,$3) RETURNING *`;
  const {
    rows: [product],
  } = await db.query(SQL, [title, description, price]);
  return product;
}

export async function getUserOrdersWithProduct({ userId, productId }) {
  // Order's user_id must = users.id
  const SQL = `SELECT orders.* FROM orders_products
    JOIN orders ON order_id = orders.id
    JOIN products ON product_id = products.id
    WHERE orders.user_id = $1 AND products.id = $2`;
  const { rows: orders } = await db.query(SQL, [userId, productId]);
  return orders;
}
