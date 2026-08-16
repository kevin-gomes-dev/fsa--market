import db from "#db/client";

export async function getProducts() {
  const SQL = `SELECT * FROM products`;
  const { rows: products } = await db.query(SQL);
  console.log(products);
  return products;
}

export async function getProduct({ id }) {
  const SQL = `SELECT * FROM products WHERE id = $1`;
  const { rows: products } = await db.query(SQL, [id]);
  return products[0];
}

export async function insertProduct({ title, description, price }) {
  const SQL = `INSERT INTO products(title,description,price) VALUES ($1,$2,$3) RETURNING *`;
  const { rows: products } = await db.query(SQL, [title, description, price]);
  return products[0];
}
