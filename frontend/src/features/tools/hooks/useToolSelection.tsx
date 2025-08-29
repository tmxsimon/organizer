import Comparator from "../comparators/components/Comparator";

const useToolSelection = (toolType?: string) => {
  switch (toolType) {
    case "comparators":
      return <Comparator />;
    default:
      console.log("Tool not found");
  }
};

export default useToolSelection;
