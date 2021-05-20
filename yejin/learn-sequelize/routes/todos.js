/* GET /users와 POST /users 주소로 요청이 들어올 때의 라우터 */
/* GET /에서도 사용자 데이터를 조회했지만, GET /users에서는 데이터를 JSON 형식으로 반환한다는 것에 차이가 있습니다.*/

const express = require('express');
const {Todo} = require('../models');

const router = express.Router();
require("dotenv").config();

router.get("/", async (req, res) => {
  await Todo.findAll()
     .then((data) => {
        res.send({
           status: 200,
           success: true,
           message: "todolist 조회 성공",
           data: data
        });
     })
     .catch((err) => {
        res.send({
           status: 500,
           success: false,
           message: err,
        });
     });
});

  router.post("/", async (req, res, next) => {
    console.log(req.body);
    try {
  
      const todos = await Todo.create({
        todo_content: req.body.todo_content,
        todo_status: req.body.todo_status,
        todo_importance: req.body.todo_importance,
      });
      
      console.log(todos);
      res.status(201).json(todos);
    } catch (err) {
      console.error(err);
      next(err);
    }
  });

module.exports = router;