const express = require("express");
const morgan = require("morgan");
const { sequelize } = require("./models");
import session from "express-session";
import passport from "passport";
import passportConfig from "./config/passport";
import env from "./config";
import TodoController from "./controllers/TodoController";
import AuthController from "./controllers/AuthController";

passportConfig(passport);

const app = express();
app.set("port", env.PORT || 3001);
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true, // saveUnintialized: resave와 비슷함. true로 세팅될 경우, 세션이 초기화되지 않은 경우에도 세션이 강제로 저장됨.
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/todos", TodoController);
app.use("/auth", AuthController);

app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = porcess.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기 중");
});
