//messages table model
//makes sequelize dataTypes accessible
const DataTypes = require("sequelize").DataTypes;

// export = access model in different files
// need access to db to do so
module.exports = (db) => {
  return db.define(
    //table name = message
    "message",
    {
      // id tends to be 1st col, and own col
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      timestamp: DataTypes.DATE,
      content: DataTypes.TEXT,
      received: DataTypes.BOOLEAN,
    },
    // tells sequelize not to add timestamps col, because we want to
    // manage the timestamps ourselves
    { timestamps: false }
  );
};
