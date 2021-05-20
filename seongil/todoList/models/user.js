const Sequelize = require("sequelize");

module.exports = class User extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            username: {
               type: Sequelize.STRING(100),
               allowNull: false,
               unique: true,
            },
            password: {
               type: Sequelize.STRING(100),
               allowNull: false,
            },
            admin: {
               type: Sequelize.BOOLEAN,
               defaultValue: false,
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: "User",
            tableName: "user",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
         }
      );
   }
   static associate(db) {
      db.User.hasMany(db.Todolist, {
         foreignKey: "username",
         sourceKey: "username",
      });
   }
};
