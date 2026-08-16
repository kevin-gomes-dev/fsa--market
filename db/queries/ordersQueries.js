import db from "#db/client";

export async function getOrders(userId) {
  const SQL = `SELECT * FROM orders WHERE user_id = $1`;
  const { rows: orders } = await db.query(SQL, [userId]);
  return orders;
}

export async function getOrder(orderId) {
  const SQL = `SELECT * FROM orders WHERE id = $1`;
  const {
    rows: [order],
  } = await db.query(SQL, [orderId]);
  return order;
}

// Optional note field
export async function insertOrder({ date, note, userId }) {
  const SQL = `INSERT INTO orders(date,note,user_id) VALUES ($1,$2,$3) RETURNING *`;
  const {
    rows: [order],
  } = await db.query(SQL, [date, note, userId]);
  return order;
}

export async function insertProductIntoOrder({ orderId, productId, quantity }) {
  const SQL = `INSERT INTO orders_products(order_id,product_id,quantity) VALUES ($1,$2,$3) RETURNING *`;
  const {
    rows: [orderProduct],
  } = await db.query(SQL, [orderId, productId, quantity]);
  return orderProduct;
}

export async function getProductsFromOrder(orderId) {
  const SQL = `SELECT products.* FROM orders_products
  JOIN orders ON order_id = orders.id
  JOIN products ON product_id = products.id
  WHERE orders.id = $1`;
  const { rows: products } = await db.query(SQL, [orderId]);
  return products;
}
