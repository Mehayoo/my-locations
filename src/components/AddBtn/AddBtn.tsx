import { Button, Icon } from "react-materialize";

interface IAddBtnProps {
  setIsOpen: (arg: boolean) => void;
  tooltipMsg?: string;
}

const AddBtn = ({ setIsOpen, tooltipMsg }: IAddBtnProps) => {
  return (
    <Button
      className="green"
      floating
      icon={<Icon>add</Icon>}
      node="button"
      onClick={() => {
        setIsOpen(true);
      }}
      small
      style={{ marginRight: "15px" }}
      tooltip={tooltipMsg}
      waves="light"
    />
  );
};

export default AddBtn;
