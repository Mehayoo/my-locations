import { ICategory } from "../entityTypes/ICategory";
import { ILocation } from "../entityTypes/ILocation";
import * as actionTypes from "../actions/types";

interface ICategoriesInitialState {
  categories: ICategory[];
  currentCategory: ICategory | null;
  currentLocation: ILocation | null;
}

const initialState: ICategoriesInitialState = {
  categories: [],
  currentCategory: null,
  currentLocation: null,
};

const categoriesReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case actionTypes.ADD_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case actionTypes.EDIT_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category: ICategory) =>
          category.id === action.payload.id ? action.payload : category
        ),
      };
    case actionTypes.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category: ICategory) => category.id !== action.payload
        ),
      };
    case actionTypes.SET_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: action.payload,
      };
    case actionTypes.CLEAR_CURRENT_CATEGORY:
      return {
        ...state,
        currentCategory: null,
      };

    case actionTypes.ADD_LOCATION:
      return {
        ...state,
        categories: state.categories.map((category: ICategory) =>
          category.id === action.payload.category.id
            ? {
                ...category,
                locations: [...category.locations, action.payload.locationData],
              }
            : category
        ),
        currentCategory: {
          ...state.currentCategory,
          locations: [
            ...(state.currentCategory?.locations as ILocation[]),
            action.payload.locationData,
          ],
        },
      };
    case actionTypes.EDIT_LOCATION:
      return {
        ...state,
        categories: state.categories.map((category: ICategory) =>
          category.id === action.payload.category.id
            ? {
                ...category,
                locations: category.locations.map((location) =>
                  location.id === action.payload.locationData.id
                    ? action.payload.locationData
                    : location
                ),
              }
            : category
        ),
        currentCategory: {
          ...state.currentCategory,
          locations: state.currentCategory?.locations.map((location) =>
            location.id === action.payload.locationData.id
              ? action.payload.locationData
              : location
          ),
        },
      };

    case actionTypes.DELETE_LOCATION:
      return {
        ...state,
        categories: state.categories.map((category: ICategory) =>
          category.id === action.payload.categoryId
            ? {
                ...category,
                locations: category.locations.filter(
                  (location) => location.id !== action.payload.locationId
                ),
              }
            : category
        ),
        currentCategory: {
          ...state.currentCategory,
          locations: state.currentCategory?.locations.filter(
            (location) => location.id !== action.payload.locationId
          ),
        },
      };

    case actionTypes.SET_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: action.payload,
      };
    case actionTypes.CLEAR_CURRENT_LOCATION:
      return {
        ...state,
        currentLocation: null,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
