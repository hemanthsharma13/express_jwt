const Sequelize = require("sequelize");
const db = require("../config/database");

const Work = db.define("Work", {
  event: {
    type: Sequelize.STRING,
  },
  day: {
    type: Sequelize.STRING,
  },
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  test: {
    type: Sequelize.INTEGER,
    primaryKey: false,
  },
});

module.exports = Work;
