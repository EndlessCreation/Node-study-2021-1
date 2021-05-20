const express = require("express");
const { User } = require("../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const authMiddleware = require("../middlewares/auth");
const crypto = require("crypto");
const cookie = require("cookie");

const router = express.Router();
require("dotenv").config();
router.use("/signout", authMiddleware);

const hash = (password) => {
   return crypto
      .createHmac("sha256", process.env.SECRET_KEY)
      .update(password)
      .digest("hex");
};

router.post("/signin", (req, res) => {
   const { username, password } = req.body;
   User.create({
      username: username,
      password: hash(password),
   })
      .then(() => {
         return res.send({
            status: 201,
            success: true,
            message: "회원가입 성공",
         });
      })
      .catch((err) => {
         if (err.errors[0].type === "unique violation") {
            res.send({
               status: 400,
               success: false,
               message: `${err.errors[0].value} 는 중복된 아이디입니다.`,
            });
         }
      });
});

router.delete("/signout", async (req, res) => {
   const { password } = req.body;
   const { username } = req.decoded;
   User.destroy({
      where: {
         username: username,
         password: hash(password),
      },
   })
      .then((data) => {
         if (data === 0) {
            res.send({
               status: 401,
               success: false,
               message: "비밀번호가 틀립니다.",
            });
         } else {
            res.send({
               status: 200,
               success: true,
               message: "탈퇴 성공",
            });
         }
      })
      .catch((err) => {
         console.log(err);
         res.send({
            status: 500,
            success: false,
            message: "탈퇴 실패",
         });
      });
});

router.post("/login", (req, res) => {
   const { username, password } = req.body;
   const secret = req.app.get("jwt-secret");

   const check = (user) => {
      if (!user) {
         throw new Error("login failed");
      } else {
         const p = new Promise((resolve, reject) => {
            jwt.sign(
               {
                  id: user.id,
                  username: user.username,
                  admin: user.admin,
               },
               secret,
               {
                  expiresIn: "7d",
                  issuer: "seongil-Shin",
                  subject: "userInfo",
               },
               (err, token) => {
                  if (err) reject(err);
                  resolve(token);
               }
            );
         });
         return p;
      }
   };

   const respond = (token) => {
      res.cookie("access_token", token, {
         maxAge: 1000 * 60 * 60 * 24 * 7,
         httpOnly: true,
      });
      res.json({
         message: "로그인 성공",
         token,
      });
   };
   const onError = (error) => {
      res.status(403).json({
         message: error.message,
      });
   };

   User.findOne({
      where: {
         username: username,
         password: hash(password),
      },
   })
      .then(check)
      .then(respond)
      .catch(onError);
});

router.get("/logout", (req, res) => {
   const { access_token } = cookie.parse(req.headers.cookie);

   if (access_token) {
      res.clearCookie("access_token").send("로그아웃돼었습니다.");
   } else {
      res.send("로그인 한 적이 없습니다.");
   }
});

module.exports = router;
