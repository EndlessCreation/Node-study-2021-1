import Sequelize from "sequelize";

export default class Todo extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        todo: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        writer: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        completed: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.fn("now"),
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Todo",
        tableName: "todos",
        paranoid: false,
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }
  static associate(db) {
    db.Todo.belongsTo(db.User, { foreignKey: "writer", targetKey: "id" });
  }
}
