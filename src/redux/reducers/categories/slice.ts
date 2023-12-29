import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import {
	ICategoriesState,
	ICategory,
	ICategoryDraft,
} from '../../../entityTypes'

const initialState: ICategoriesState = {
	categories: [],
	currentCategory: {} as ICategory,
}

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		reset: () => initialState,
		addCategory: {
			reducer: (
				state: ICategoriesState,
				action: PayloadAction<ICategory>
			): void => {
				state.categories.push(action.payload)
				state.currentCategory = action.payload
			},
			prepare: (category: ICategoryDraft) => ({
				payload: {
					id: uuidv4(),
					...category,
				},
			}),
		},
		editCategory: (
			state: ICategoriesState,
			action: PayloadAction<ICategory>
		): void => {
			const index = state.categories.findIndex(
				(category: ICategory) => category.id === action.payload.id
			)
			state.categories[index] = action.payload
			state.currentCategory = action.payload
		},
		deleteCategory: (
			state: ICategoriesState,
			action: PayloadAction<string>
		): void => {
			const index = state.categories.findIndex(
				(category: ICategory) => category.id === action.payload
			)
			state.categories.splice(index, 1)
		},
		setCurrentCategory: (
			state: ICategoriesState,
			action: PayloadAction<ICategory>
		): void => {
			state.currentCategory = action.payload
		},
		clearCurrentCategory: (state: ICategoriesState): void => {
			state.currentCategory = {} as ICategory
		},
	},
})

export const { actions: categoryActions, reducer: categoriesReducer } =
	categoriesSlice
