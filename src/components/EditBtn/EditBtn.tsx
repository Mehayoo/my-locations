import { Button, Icon } from "react-materialize";

interface IEditBtnProps {
  editMode: "inline" | "popup";
  editingState: boolean;
  onClick: () => void;
  tooltipMsg?: string;
}

const EditBtn = ({
  editMode,
  editingState,
  onClick,
  tooltipMsg,
}: IEditBtnProps) => {
  const RenderIcon = () => {
    switch (editMode) {
      case "inline":
        return editingState ? <Icon>close</Icon> : <Icon>create</Icon>;
      case "popup":
        return <Icon>create</Icon>;
    }
  };

  return (
    <Button
      className="blue"
      floating
      icon={<RenderIcon />}
      node="button"
      onClick={onClick}
      small
      style={{ marginLeft: "15px" }}
      tooltip={tooltipMsg}
      waves="light"
    />
  );
};

export default EditBtn;
