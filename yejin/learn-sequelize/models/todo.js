const Sequelize = require('sequelize');

// User 모델을 만들고 모듈로 exports했습니다. User 모델은 Sequelize.Model을 확장한 클래스로 선언합니다. 
module.exports = class Todo extends Sequelize.Model {
    //init 메서드에는 테이블에 대한 설정
  static init(sequelize) {
    // super.init 메서드의 첫 번째 인수가 테이블 컬럼에 대한 설정이고, 두 번째 인수가 테이블 자체에 대한 설정 (테이블 옵션)
    // 시퀄라이즈는 알아서 id를 기본 키로 연결하므로 id 컬럼은 적어줄 필요가 없다.
    // 나머지 컬럼의 스펙을 입력합니다. MySQL 테이블과 컬럼 내용이 일치해야 정확하게 대응됩니다.
    return super.init({
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      todo_content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      todo_status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      todo_importance: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Todo',
      tableName: 'todo',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }
  // associate 메서드에는 다른 모델과의 관계를 적는다.
  static associate(db) {
  }
};