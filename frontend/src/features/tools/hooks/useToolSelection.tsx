import Comparator from "../comparators/pages/Comparator";
import Todo from "../todos/pages/Todo";

const useToolSelection = (toolType?: string) => {
  switch (toolType) {
    case "todos":
      return <Todo />;
    case "comparators":
      return <Comparator />;
    default:
      console.log("Tool not found");
  }
};

export default useToolSelection;
