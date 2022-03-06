import { Button, Icon } from "react-materialize";

interface IViewDetailsBtnProps {
  setIsOpen: (arg: boolean) => void;
  setIsViewMode: (arg: boolean) => void;
}

const ViewDetailsBtn = ({ setIsOpen, setIsViewMode }: IViewDetailsBtnProps) => {
  return (
    <Button
      className="grey"
      floating
      icon={<Icon>remove_red_eye</Icon>}
      node="button"
      onClick={() => {
        setIsOpen(true);
        setIsViewMode(true);
      }}
      small
      style={{ marginLeft: "15px" }}
      tooltip="View details"
      waves="light"
    />
  );
};

export default ViewDetailsBtn;
