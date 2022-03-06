import { combineReducers } from "redux";
import categoriesReducer from "./categoriesReducer";

export const rootReducer = combineReducers({
  categoriesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

// Was initially going to use 2 reducers, one for Categories and one for Locations, but decided to only use a single one in the end.
// Part of the logic for the second reducer, Locations reducer, is already implemented but it proved to be a much more difficult approach,
// which was much more easily and elegantly solved by using a single reducer in my opinion.
