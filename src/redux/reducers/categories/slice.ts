import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICategoriesState, ICategory } from '../../../entityTypes'

const initialState: ICategoriesState = {
	categories: [],
	currentCategory: {} as ICategory,
}

const categoriesSlice = createSlice({
	name: 'categories',
	initialState,
	reducers: {
		reset: () => initialState,
		addCategory: (state, action: PayloadAction<ICategory>) => {
			state.categories.push(action.payload)
			state.currentCategory = action.payload
		},
		editCategory: (state, action: PayloadAction<ICategory>) => {
			const index = state.categories.findIndex(
				(category: ICategory) => category.id === action.payload.id
			)
			state.categories[index] = action.payload
			state.currentCategory = action.payload
		},
		deleteCategory: (state, action: PayloadAction<string>) => {
			const index = state.categories.findIndex(
				(category: ICategory) => category.id === action.payload
			)
			state.categories.splice(index, 1)
		},
		setCurrentCategory: (state, action: PayloadAction<ICategory>) => {
			state.currentCategory = action.payload
		},
		clearCurrentCategory: (state) => {
			state.currentCategory = {} as ICategory
		},
	},
})

export const { actions: categoryActions, reducer: categoriesReducer } =
	categoriesSlice
