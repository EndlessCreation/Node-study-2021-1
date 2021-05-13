const Sequelize = require("sequelize");
const Todolist = require("./todolist");

const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

sequelize = new Sequelize(
   config.database,
   config.username,
   config.password,
   config
);
db.sequelize = sequelize;

db.Todolist = Todolist;

Todolist.init(sequelize);

Todolist.associate(db);

module.exports = db;
