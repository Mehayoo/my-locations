import { EditBtn } from "../index";
import { useSelector } from "react-redux";
import { ICategory } from "../../entityTypes/ICategory";
import { ILocation } from "../../entityTypes/ILocation";
import { RootState } from "../../reducers";

import "./style.scss";

interface ILocationTitleBarProps {
  isEditMode: boolean;
  setIsEditMode: (arg: boolean) => void;
  setIsOpen: (arg: boolean) => void;
}

const LocationTitleBar = ({
  isEditMode,
  setIsEditMode,
  setIsOpen,
}: ILocationTitleBarProps) => {
  const categoriesState = useSelector(
    (state: RootState) => state.categoriesReducer
  );
  const {
    currentLocation: selectedLocation,
  }: { categories: ICategory[]; currentLocation: ILocation } = categoriesState;

  const onClick = () => {
    setIsEditMode(true);
    setIsOpen(true);
  };

  return (
    <div className="location-title-container">
      <div className="location-title">
        {selectedLocation ? selectedLocation.name : "Location_Name"}
      </div>
      {selectedLocation && (
        <EditBtn
          editMode="popup"
          editingState={isEditMode}
          onClick={onClick}
          tooltipMsg="Edit location"
        />
      )}
    </div>
  );
};

export default LocationTitleBar;
