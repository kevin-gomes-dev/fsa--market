DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS orders_products CASCADE;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price decimal NOT NULL
);

CREATE TABLE orders(
    id SERIAL PRIMARY KEY,
    date date NOT NULL,
    note TEXT,
    user_id int NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE orders_products(
    order_id int NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id int NOT NULL REFERENCES products(id) ON DELETE CASCADE,
    quantity int NOT NULL,
    PRIMARY KEY (order_id,product_id)
);