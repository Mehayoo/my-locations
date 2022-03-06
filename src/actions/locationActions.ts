import { ILocation } from "../entityTypes/ILocation";
import * as actionTypes from "./types";

export const addNewCategoryToLocation = (category: string) => ({
  type: actionTypes.ADD_NEW_CATEGORY_TO_LOCATION,
  payload: category,
});

export const editCategoryOfLocation = (
  oldPropertyName: string,
  newPropertyName: string
) => {
  return {
    type: actionTypes.EDIT_CATEGORY_OF_LOCATION,
    payload: {
      oldPropertyName,
      newPropertyName,
    },
  };
};
