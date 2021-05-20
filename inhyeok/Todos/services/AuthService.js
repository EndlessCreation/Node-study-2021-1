import * as UserRepository from "../repositorys/UserRepository";
import statusCode from "../modules/statusCode";
import utils from "../modules/utils";
import bcrypt from "bcrypt";
import passport from "passport";

export const singup = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res
      .statu(statusCode.BAD_REQUEST)
      .send(utils.fail(statusCode.BAD_REQUEST, "필요 값 없음"));
  }
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = await UserRepository.createLocal(req.body);
    if (user) {
      res
        .status(statusCode.OK)
        .send(utils.success(statusCode.OK, "회원가입 성공"));
    } else {
      res
        .status(statusCode.INTERNAL_SERVER_ERROR)
        .send(
          utils.fail(statusCode.INTERNAL_SERVER_ERROR, "알수 없는 에러 발생")
        );
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(statusCode.BAD_REQUEST)
      .send(utils.fail(statusCode.BAD_REQUEST, "필요 값 없음"));
  }

  passport.authenticate("local", (err, user) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (!user) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send({ message: "해당 유저 정보가 없습니다." });
    }
    req.logIn(user, function (err) {
      if (err) {
        console.error(err);
        return next(err);
      }
      return res
        .status(statusCode.OK)
        .send(
          utils.successData(statusCode.OK, "로그인성공", {
            id: user.id,
            name: user.name,
            email: user.email,
          })
        );
    });
  })(req, res, next);
};

export const logout = (req, res, next) => {
  req.logout();
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      next(err);
    } else {
      res.clearCookie("connect.sid");
      res
        .status(statusCode.OK)
        .send(utils.success(statusCode.OK, "로그아웃 성공"));
    }
  });
};
