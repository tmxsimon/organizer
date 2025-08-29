import { useParams } from "react-router-dom";
import useToolSelection from "../hooks/useToolSelection";
import Icon from "../../../components/Icon";

const Tool = () => {
  const { toolsType } = useParams();
  const tool = useToolSelection(toolsType);

  return (
    <>
      {tool}
      <a href="." className="absolute top-10 left-4">
        <Icon name="back" />
      </a>
    </>
  );
};

export default Tool;
