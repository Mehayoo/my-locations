import { Button, Icon } from "react-materialize";

interface IDeleteBtnProps {
  onClick: () => void;
  tooltipMsg: string;
}

const DeleteBtn = ({ onClick, tooltipMsg }: IDeleteBtnProps) => {
  return (
    <Button
      className="red"
      floating
      icon={<Icon>delete</Icon>}
      node="button"
      onClick={onClick}
      small
      style={{ marginLeft: "15px" }}
      tooltip={tooltipMsg}
      waves="light"
    />
  );
};

export default DeleteBtn;
