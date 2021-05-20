const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');

const app = express();
app.set('port', process.env.PORT || 3001);

sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const todos = require('./routes/todos');
app.use('/todos', todos);


app.get("/", (req, res) => {
  res.send("..^^..");
});




app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});