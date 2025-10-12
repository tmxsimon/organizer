import { useParams } from "react-router-dom";
import { useTodo } from "../hooks/useTodo";
import Button from "../../../../components/Button";
import Icon from "../../../../components/Icon";
import TodoEntry from "../components/TodoEntry";
import { useTranslation } from "react-i18next";

const Todo = () => {
  const { t } = useTranslation();
  const { toolId } = useParams();
  const id = parseInt(toolId!);

  const {
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
  } = useTodo(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

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
              {t("common.inProgress")}
            </button>
            <button
              className={`${!isDone && "text-neutral-500"} cursor-pointer`}
              onClick={() => setIsDone(true)}
            >
              {t("common.done")}
            </button>
          </div>

          <Button
            size="lg"
            className="mt-base"
            onClick={() => addEntry.mutate()}
          >
            <Icon name="add" />
          </Button>

          <div className="gap-base-s mt-base flex w-full max-w-256 flex-col">
            {entries.map((entry) => (
              <TodoEntry
                key={entry.id}
                entry={entry}
                editFn={(data) => editEntry.mutate(data)}
                toggleFn={(id) => toggleEntry.mutate(id)}
                deleteFn={(id) => deleteEntry.mutate(id)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
};

export default Todo;
