import { combineReducers } from '@reduxjs/toolkit'
import { categoriesReducer } from './categories/slice'
import { locationsReducer } from './locations/slice'

export const rootReducer = combineReducers({
	categoriesReducer,
	locationsReducer,
})
