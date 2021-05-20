import { Todo } from "../models";

export const findTodosAll = async () => {
  try {
    return await Todo.findAll();
  } catch (err) {
    console.error(err);
  }
};

export const findTodosById = async (userId) => {
  try {
    return await Todo.findAll({ where: { writer: userId } });
  } catch (err) {
    console.error(err);
  }
};

export const create = async (todo, writer) => {
  try {
    return await Todo.create({ todo, writer });
  } catch (err) {
    console.error(err);
  }
};

export const updateCompleted = async (id, completed) => {
  try {
    return await Todo.update({ completed: completed }, { where: { id: id } });
  } catch (err) {
    console.error(err);
  }
};

export const deleteTodo = async (id) => {
  try {
    return await Todo.destroy({ where: { id: id } });
  } catch (err) {
    console.error(err);
  }
};
