import db from "#db/client";

export async function getOrders() {
  const SQL = `SELECT * FROM orders`;
  const { rows: orders } = await db.query(SQL);
  return orders;
}

// Optional note field
export async function insertOrder({ date, note, userId }) {
  const SQL = `INSERT INTO orders(date,note,user_id) VALUES ($1,$2,$3) RETURNING *`;
  const { rows: orders } = await db.query(SQL, [date, note, userId]);
  return orders[0];
}

export async function insertProductIntoOrder({ orderId, productId, quantity }) {
  const SQL = `INSERT INTO orders_products(order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *`;
  const { rows: orderProducts } = await db.query(SQL, [orderId, productId, quantity]);
  return orderProducts[0];
}
