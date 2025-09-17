import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchTodo } from "../services";
import type { TodoEntryType } from "../types";
import { useEffect, useState } from "react";
import api from "../../../../lib/api";
import Button from "../../../../components/Button";
import Icon from "../../../../components/Icon";
import TodoEntry from "../components/TodoEntry";

const Todo = () => {
  const { toolId: todoId } = useParams();

  const {
    data: todo,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["todo", todoId],
    queryFn: () => fetchTodo(parseInt(todoId!)),
  });

  const [entries, setEntries] = useState<TodoEntryType[]>(todo?.entries || []);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    if (todo?.entries) {
      setEntries(todo.entries);
    }
  }, [todo]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  const handleAddEntry = async () => {
    await api
      .post(`/tools/todos/${todoId}/entries`, null, {
        params: {
          text: "new todo",
        },
      })
      .then(function (response) {
        setEntries([
          {
            id: response.data.id,
            text: response.data.text,
            is_done: false,
          },
          ...entries,
        ]);
        setIsDone(false);
      });
  };

  const handleToggleTodo = async (id: number) => {
    await api
      .put(`/tools/todos/entries/${id}/toggle`)
      .then(function (response) {
        setEntries([
          {
            id: response.data.id,
            text: response.data.text,
            is_done: response.data.is_done,
          },
          ...entries.filter((entry) => entry.id !== id),
        ]);
      });
  };

  const handleDeleteEntry = async (id: number) => {
    await api.delete(`/tools/todos/entries/${id}`).then(function () {
      setEntries(entries.filter((entry) => entry.id != id));
    });
  };

  const entriesFiltered = entries.filter((entry) => entry.is_done === isDone);

  const entriesMapped = entriesFiltered.map((entry: TodoEntryType) => (
    <TodoEntry
      key={entry.id}
      entry={entry}
      toggleFunction={handleToggleTodo}
      deleteFunction={handleDeleteEntry}
    />
  ));

  return (
    <section className="p-base flex w-full flex-col items-center justify-center">
      {todo && (
        <>
          <h1 className="text-4xl">{todo.name}</h1>
          <div className="flex w-48 justify-between">
            <button
              className={`${isDone && "text-neutral-500"} cursor-pointer`}
              onClick={() => setIsDone(false)}
            >
              In Progress
            </button>
            <button
              className={`${!isDone && "text-neutral-500"} cursor-pointer`}
              onClick={() => setIsDone(true)}
            >
              Done
            </button>
          </div>

          <Button size="lg" className="mt-base" onClick={handleAddEntry}>
            <Icon name="add" />
          </Button>
          <div className="gap-base mt-base flex w-full max-w-256 flex-col">
            {entriesMapped}
          </div>
        </>
      )}
    </section>
  );
};

export default Todo;
