const Sequelize = require("sequelize");

const db = new Sequelize(
  `postgres://hackupstate@localhost:5432/appliancedoctor`,
  {
    logging: false,
  }
);

const Customer = require("./Customer")(db);
const User = require("./User")(db);
const Appliance = require("./Appliance")(db);

const connectDB = async () => {
  await db.authenticate();
  console.log(`Connected to DB.`);

  db.sync();
};

connectDB();
module.exports = { db, Customer, User, Appliance };
