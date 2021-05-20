import express from "express";
import * as TodoService from "../services/TodoService";
import * as AuthHelper from "../middleware/AuthHelper";

const router = express.Router();

router.get("/", TodoService.Todolist);
router.get("/:id", AuthHelper.isLoggedIn, TodoService.UserTodolist);
router.post("/", AuthHelper.isLoggedIn, TodoService.CreateTodo);
router.patch("/:id/complete", AuthHelper.isLoggedIn, TodoService.Completed);
router.delete("/:id", AuthHelper.isLoggedIn, TodoService.Deleted);

export default router;
