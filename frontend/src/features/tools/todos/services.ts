import api from "../../../lib/api";
import type { TodoType } from "./types";

const path = "/tools/todos";

export const fetchTodos = async () => {
  const result = await api.get(path);
  return result;
};

export const fetchTodo = async (id: number) => {
  const result = await api.get<TodoType>(`${path}/${id}`);
  return result.data;
};

export const toggleEntryIsDone = async (id: number) => {
  const result = await api.put<TodoType>(`${path}/${id}/toggle`);
  return result.data;
};
