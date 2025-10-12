import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../../lib/api";
import { fetchTodo } from "../services";
import type { TodoEntryType } from "../types";

const PATH = "/tools/todos";

export function useTodo(todoId: number) {
  const queryClient = useQueryClient();

  const {
    data: todo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => fetchTodo(todoId),
  });

  const [isDone, setIsDone] = useState(false);

  const addEntry = useMutation({
    mutationFn: () =>
      api.post(`${PATH}/${todoId}/entries`, null, {
        params: { text: "" },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", todoId] });
      setIsDone(false);
    },
  });

  const editEntry = useMutation({
    mutationFn: ({ id, text }: { id: number; text: string }) =>
      api.put(`${PATH}/entries/${id}`, null, {
        params: { text: text },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", todoId] });
    },
  });

  const toggleEntry = useMutation({
    mutationFn: (id: number) => api.put(`${PATH}/entries/${id}/toggle`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", todoId] });
    },
  });

  const deleteEntry = useMutation({
    mutationFn: (id: number) => api.delete(`${PATH}/entries/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", todoId] });
    },
  });

  const entries: TodoEntryType[] =
    todo?.entries.filter((entry) => entry.is_done === isDone) || [];

  return {
    todo,
    isLoading,
    error,
    entries,
    isDone,
    setIsDone,
    addEntry,
    editEntry,
    toggleEntry,
    deleteEntry,
  };
}
