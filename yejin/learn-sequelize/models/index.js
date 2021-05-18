const Sequelize = require('sequelize');

// 모델 연결
const Todo = require('./todo');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);
db.sequelize = sequelize;

// db라는 객체에 User와 Comment 모델을 담아두기
// 앞으로 db 객체를 require하여 User와 Comment 모델에 접근할 수 있습니다.
db.Todo = Todo;


// User.init과 Comment.init은 각각의 모델의 static.init 메서드를 호출하는 것입니다. init이 실행되어야 테이블이 모델로 연결
Todo.init(sequelize);

// 다른 테이블과의 관계를 연결하는 associate 메서드도 미리 실행
Todo.associate(db);


module.exports = db;