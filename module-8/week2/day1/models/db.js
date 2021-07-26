//pulls in sequelize
const Sequelize = require("sequelize");

// connect into databse
// new connection in sequelize - default username - connect in using postgres (port 5432 (default port)) - message2 (name of our db)
const db = new Sequelize("postgres://hackupstate@localhost:5432/messages2", {
  logging: false,
});

// anonymous function
// wait for db to connect (async/await)
// db.authenticate is async - wont stop other code from running so we need to wait for it to finish first
(async () => {
  try {
    await db.authenticate();
    console.log("DB connected successfully.");
  } catch (e) {
    console.error("DB connection failed.");
  }
  // pull in Message.js model
  require("./Message")(db);
  //sync the models with whatever is in the db
  db.sync();
})();

module.exports = { db };
