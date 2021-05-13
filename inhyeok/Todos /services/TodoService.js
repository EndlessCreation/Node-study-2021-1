import * as TodoRepository from "../repositorys/TodoRepository";
import statusCode from "../modules/statusCode";
import utils from "../modules/utils";

export const Todolist = async (req, res, next) => {
  try {
    const Todos = await TodoRepository.findTodosAll();

    res
      .status(statusCode.OK)
      .send(utils.success(statusCode.OK, "전체 todos", Todos));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const UserTodolist = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const Todos = await TodoRepository.findTodosById(userId);

    res
      .status(statusCode.OK)
      .send(utils.success(statusCode.OK, "사용자 todos", Todos));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const CreateTodo = async (req, res, next) => {
  const { todo, writer } = req.body;
  if (!todo || !writer) {
    console.log("필요값이 없습니다.");
    return res
      .status(statusCode.BAD_REQUEST)
      .send(utils.fail(statusCode.BAD_REQUEST, "필요값이 없습니다."));
  }
  try {
    const response = await TodoRepository.create(todo, writer);
    if (!response) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(utils.fail(statusCode.BAD_REQUEST, "등록 실패."));
    }
    res
      .status(statusCode.OK)
      .send(utils.success(statusCode.OK, "등록 성공", response));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const Completed = async (req, res, next) => {
  const { completed } = req.body;
  try {
    const response = await TodoRepository.updateCompleted(
      req.params.id,
      completed
    );
    if (!response) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(utils.fail(statusCode.BAD_REQUEST, "수정 실패."));
    }
    res
      .status(statusCode.OK)
      .send(utils.success(statusCode.OK, "수정 성공", response));
  } catch (err) {
    console.error(err);
    next(err);
  }
};

export const Deleted = async (req, res, next) => {
  try {
    const response = await TodoRepository.deleteTodo(req.params.id);
    if (!response) {
      return res
        .status(statusCode.BAD_REQUEST)
        .send(utils.fail(statusCode.BAD_REQUEST, "삭제 실패."));
    }
    res
      .status(statusCode.OK)
      .send(utils.success(statusCode.OK, "삭제 성공", response));
  } catch (err) {
    console.error(err);
    next(err);
  }
};
