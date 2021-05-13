import express from "express";
import * as TodoService from "../services/TodoService";
const router = express.Router();

router.get("/", TodoService.Todolist);
router.get("/:id", TodoService.UserTodolist);
router.post("/", TodoService.CreateTodo);
router.patch("/:id/complete", TodoService.Completed);
router.delete("/:id", TodoService.Deleted);

export default router;
