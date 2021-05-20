import Sequelize from "sequelize";
import env from "../config";
import User from "./user";
import Todo from "./todo";

const db = {};

const sequelize = new Sequelize(
  env.sequelizeConfig.database,
  env.sequelizeConfig.username,
  env.sequelizeConfig.password,
  env.sequelizeConfig
);
db.sequelize = sequelize;
db.User = User;
db.Todo = Todo;

User.init(sequelize);
Todo.init(sequelize);
module.exports = db;
