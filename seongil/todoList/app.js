const express = require("express");
const morgan = require("morgan");
const { sequelize } = require("./models");
require("dotenv").config();

sequelize
   .sync({ force: true }) // 서버 실행 시 mysql 연결. force:true 일 경우, 서버 실행 시 마다 테이블을 재생성함. 테이블을 잘못만든 경우 true로 설정
   .then(() => {
      console.log("데이터베이스 연결 성공");
   })
   .catch((err) => {
      console.error(err);
   });

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set the secret key for jwt
app.set("jwt-secret", process.env.SECRET_KEY);

app.get("/", (req, res) => {
   res.send("Hello, Express");
});

const todolist = require("./routes/todolist");
app.use("/todolist", todolist);

const user = require("./routes/user");
app.use("/user", user);

app.listen(app.get("port"), () => {
   console.log(app.get("port"), "번 포트에서 대기 중");
});
