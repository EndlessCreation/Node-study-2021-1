const express = require("express");
const { Todolist } = require("../models");
const cookie = require("cookie");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();
require("dotenv").config();
router.use(authMiddleware);

router.get("/", async (req, res) => {
   const { username } = req.decoded;
   await Todolist.findAll({
      where: {
         username: username,
      },
   })
      .then((data) => {
         res.send({
            status: 200,
            success: true,
            message: "todolist 조회 성공",
            data: data,
         });
      })
      .catch(() => {
         res.send({
            status: 500,
            success: false,
            message: "todolist 조회 실패",
         });
      });
});

router.post("/", async (req, res) => {
   const { username } = req.decoded;
   await Todolist.create({ ...req.body, username: username })
      .then(() => {
         res.send({
            status: 201,
            success: true,
            message: "todolist 추가 성공",
         });
      })
      .catch((err) => {
         if (err.errors[0].type === "notNull Violation") {
            res.send({
               status: 400,
               success: false,
               message: `${err.errors[0].path}는 필수값입니다.`,
            });
         } else if (err.errors[0].type === "unique violation") {
            res.send({
               status: 400,
               success: false,
               message: `${err.errors[0].value} 는 중복된 제목입니다.`,
            });
         } else {
            res.send({
               status: 500,
               success: false,
               message: "todolist 추가 실패",
            });
         }
      });
});

router.delete("/:id", async (req, res) => {
   const { username } = req.decoded;
   await Todolist.destroy({
      where: { id: req.params.id, username: username },
   })
      .then((data) => {
         if (data === 0) {
            res.send({
               status: 400,
               success: false,
               message: "존재하지 않는 항목",
            });
         } else {
            res.send({
               status: 200,
               success: true,
               message: "삭제 성공",
            });
         }
      })
      .catch(() => {
         res.send({
            status: 500,
            success: false,
            message: "삭제 실패",
         });
      });
});

router.put("/", async (req, res) => {
   if (!req.body.id) {
      return res.send({
         status: 400,
         success: false,
         message: "id를 넣어주세요",
      });
   }

   const { username } = req.decoded;
   await Todolist.update(req.body, {
      where: { id: req.body.id, username: username },
   })
      .then((data) => {
         if (data[0] === 0) {
            res.send({
               status: 400,
               success: false,
               message: "존재하지 않는 항목",
            });
         } else {
            res.send({
               status: 200,
               success: true,
               message: "수정 성공",
            });
         }
      })
      .catch(() => {
         res.send({
            status: 500,
            success: false,
            message: "수정 실패",
         });
      });
});

module.exports = router;
