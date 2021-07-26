const Sequelize = require("sequelize");

const db = new Sequelize(`postgres://hackupstate@localhost:5432/appliances2`, {
  logging: false,
});

const Customer = require("./Customer")(db);
const User = require("./User")(db);

const connectToDB = async () => {
  await db.authenticate();
  console.log(`DB connected successfully.`);

  db.sync();
};

connectToDB();
module.exports = { db, Customer, User };
