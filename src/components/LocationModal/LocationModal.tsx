import { useEffect, useRef, useState } from "react";
import { Button, Icon, Modal } from "react-materialize";
import { useDispatch, useSelector } from "react-redux";
import { addLocation, editLocation } from "../../actions/categoryActions";
import { ILocation } from "../../entityTypes/ILocation";
import { v4 as uuidv4 } from "uuid";
import { checkIfNestedPropertyIsEmpty } from "../../utils/checkIfNestedPropertyIsEmpty";
import { checkIfNestedPropertyExists } from "../../utils/checkIfNestedPropertyExists";

import M from "materialize-css";
import "./style.scss";

interface ILocationModalProps {
  isEditMode: boolean;
  isOpen: boolean;
  isViewMode: boolean;
  selectedLocation: ILocation;
  setIsEditMode: (arg: boolean) => void;
  setIsOpen: (arg: boolean) => void;
  setIsViewMode: (arg: boolean) => void;
}

const LocationModal = ({
  isEditMode,
  isOpen,
  isViewMode,
  selectedLocation,
  setIsEditMode,
  setIsOpen,
  setIsViewMode,
}: ILocationModalProps) => {
  const [location, setLocation] = useState<ILocation>({
    name: "",
    address: "",
    coordinates: {
      lat: "",
      lng: "",
    },
  });
  const selectedLocationId = useRef("");

  const selectedCategory = useSelector(
    (state: any) => state.categoriesReducer.currentCategory
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (selectedLocation) {
      const { id, ...restOfProps } = selectedLocation;
      selectedLocationId.current = id!;
      setLocation(restOfProps);
    }
    if (isOpen && !isEditMode && !isViewMode) {
      resetFieldsValue();
    }
  }, [isEditMode, isOpen, isViewMode, selectedLocation]);

  const onSubmit = () => {
    if (isEditMode) {
      if (!checkIfNestedPropertyIsEmpty(location)) {
        dispatch(
          editLocation({
            ...location,
            id: selectedLocationId.current,
            category: {
              id: selectedCategory.id,
              name: selectedCategory.name,
            },
          })
        );
        M.toast({ html: `Location updated` });
        resetFieldsValue();
        setIsOpen(false);
      }
    } else {
      if (
        !(
          checkIfNestedPropertyIsEmpty(location) ||
          checkIfNestedPropertyExists(location, selectedCategory.locations)
        )
      ) {
        dispatch(
          addLocation({
            ...location,
            id: uuidv4(),
            category: {
              id: selectedCategory.id,
              name: selectedCategory.name,
            },
          })
        );
        M.toast({ html: `New Location added` });
        resetFieldsValue();
        setIsOpen(false);
      }
    }
  };

  const resetFieldsValue = () => {
    setLocation({
      name: "",
      address: "",
      coordinates: {
        lat: "",
        lng: "",
      },
    });
  };

  return (
    <Modal
      actions={[]}
      header={isViewMode ? "Location Details" : "Enter New Location"}
      id="location-modal"
      open={isOpen}
      options={{ dismissible: false }}
    >
      <div className="row">
        <label htmlFor="name" className="active">
          Location Name
        </label>
        <input
          disabled={isViewMode}
          name="name"
          type="text"
          value={location?.name}
          onChange={(e) =>
            setLocation({ ...location, [e.target.name]: e.target.value })
          }
        />
      </div>

      <div className="row">
        <label htmlFor="address" className="active">
          Location Address
        </label>
        <input
          disabled={isViewMode}
          name="address"
          type="text"
          value={location?.address}
          onChange={(e) =>
            setLocation({ ...location, [e.target.name]: e.target.value })
          }
        />
      </div>

      <div className="row col s12">
        <div className="col s6">
          <label className="active" htmlFor="lat">
            Latitude
          </label>
          <input
            disabled={isViewMode}
            name="lat"
            type="text"
            value={location?.coordinates.lat}
            onChange={(e) =>
              setLocation({
                ...location,
                coordinates: {
                  ...location.coordinates,
                  [e.target.name]: e.target.value,
                },
              })
            }
          />
        </div>
        <div className="col s6">
          <label className="active" htmlFor="lng">
            Longitude
          </label>
          <input
            disabled={isViewMode}
            name="lng"
            type="text"
            value={location?.coordinates.lng}
            onChange={(e) => {
              setLocation({
                ...location,
                coordinates: {
                  ...location.coordinates,
                  [e.target.name]: e.target.value,
                },
              });
            }}
          />
        </div>
      </div>

      <div className="row">
        <label htmlFor="category.name" className="active">
          Category
        </label>
        <input
          disabled
          name="category.name"
          type="text"
          value={selectedCategory.name}
        />
      </div>

      <div className="modal-footer">
        <Button
          className="red"
          node="button"
          onClick={() => {
            resetFieldsValue();
            setIsEditMode(false);
            setIsOpen(false);
            setIsViewMode(false);
          }}
        >
          Close
        </Button>

        <Button disabled={isViewMode} node="button" onClick={onSubmit}>
          <Icon right>send</Icon>Submit
        </Button>
      </div>
    </Modal>
  );
};

export default LocationModal;
