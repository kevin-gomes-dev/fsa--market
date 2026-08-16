import db from "#db/client";
import bcrypt from "bcrypt";
export async function insertUser({ username, password }) {
  const SQL = `INSERT INTO users(username,password) VALUES($1,$2) RETURNING *`;
  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows: users } = await db.query(SQL, [username, hashedPassword]);
  return users[0];
}
