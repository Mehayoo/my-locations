import { useNavigate } from "react-router-dom";
import { Button, Icon } from "react-materialize";
import { ICategory } from "../../entityTypes/ICategory";

interface INavBtnProps {
  currentCategory: ICategory;
}

const NavBtn = ({ currentCategory }: INavBtnProps) => {
  const navigate = useNavigate();
  return (
    <Button
      flat
      icon={<Icon>send</Icon>}
      node="button"
      onClick={() => {
        navigate(`/${currentCategory?.name}/locations`);
      }}
      tooltip={`View Locations for ${currentCategory?.name}`}
    />
  );
};

export default NavBtn;
