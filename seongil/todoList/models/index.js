const Sequelize = require("sequelize");
const Todolist = require("./todolist");
const User = require("./user");

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
db.User = User;

Todolist.init(sequelize);
User.init(sequelize);

Todolist.associate(db);
User.associate(db);

module.exports = db;
