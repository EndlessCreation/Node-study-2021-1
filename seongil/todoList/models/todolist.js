const Sequelize = require("sequelize");

module.exports = class Todolist extends Sequelize.Model {
   static init(sequelize) {
      return super.init(
         {
            subject: {
               type: Sequelize.STRING(100),
               allowNull: false,
               unique: true,
            },
            detail: {
               type: Sequelize.TEXT,
               allowNull: true,
            },
            createdAt: {
               type: Sequelize.DATE,
               allowNull: false,
               defaultValue: Sequelize.NOW,
            },
         },
         {
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: "Todolist",
            tableName: "todolist",
            paranoid: false,
            charset: "utf8",
            collate: "utf8_general_ci",
         }
      );
   }
   static associate(db) {}
};
