const DT = require("sequelize").DataTypes;

module.exports = (db) => {
  return db.define("appliance", {
    applianceID: {
      type: DT.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    make: DT.STRING,
    model: DT.STRING,
  });
};
