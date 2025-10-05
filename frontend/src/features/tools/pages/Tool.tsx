import { Link, useParams } from "react-router-dom";
import useToolSelection from "../hooks/useToolSelection";
import Icon from "../../../components/Icon";

const Tool = () => {
  const { toolsType } = useParams();
  const tool = useToolSelection(toolsType);

  return (
    <>
      {tool}
      <Link to="../" className="absolute top-10 left-4">
        <Icon name="back" />
      </Link>
    </>
  );
};

export default Tool;
