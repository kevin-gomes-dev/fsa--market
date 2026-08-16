import db from "#db/client";
import { faker } from "@faker-js/faker";
import { insertProduct } from "#db/queries/productsQueries";
import { insertOrder, insertProductIntoOrder } from "#db/queries/ordersQueries";
import { insertUser } from "#db/queries/usersQueries";
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const userCount = 1;

  for (let i = 0; i < userCount; i++) {
    const user = { username: "user" + i > 0 ? i : "user", password: "a" };
    const processedUser = await insertUser(user);
    console.log(processedUser);

    const order = {
      date: faker.date.anytime(),
      note: Math.random() > 0.5 ? "OrderDescription" + i : "",
      userId: processedUser.id,
    };
    const processedOrder = await insertOrder(order);
    console.log(processedOrder);

    for (let j = 0; j < 10; j++) {
      const product = {
        title: faker.food.dish() + j,
        description: "ProdDescription" + j,
        price: (Math.random() * 67).toFixed(2),
      };
      const processedProduct = await insertProduct(product);
      console.log(processedProduct);

      const orderProduct = {
        orderId: processedOrder.id,
        productId: processedProduct.id,
        quantity: Math.floor(Math.random() * 15),
      };
      const processedOrderProduct = await insertProductIntoOrder(orderProduct);
      console.log(processedOrderProduct);
    }
  }
}
