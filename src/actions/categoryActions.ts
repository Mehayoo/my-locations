import { ICategory, ILocation } from '../entityTypes'
import * as actionTypes from './types'

export const addCategory = (category: ICategory) => ({
	type: actionTypes.ADD_CATEGORY,
	payload: category,
})

export const editCategory = (category: ICategory) => ({
	type: actionTypes.EDIT_CATEGORY,
	payload: category,
})

export const deleteCategory = (id: string) => ({
	type: actionTypes.DELETE_CATEGORY,
	payload: id,
})

export const setCurrentCategory = (category: ICategory) => ({
	type: actionTypes.SET_CURRENT_CATEGORY,
	payload: category,
})

export const clearCurrentCategory = () => ({
	type: actionTypes.CLEAR_CURRENT_CATEGORY,
})

export const addLocation = (location: ILocation) => {
	const { category, ...restOfProps } = location

	return {
		type: actionTypes.ADD_LOCATION,
		payload: {
			locationData: { ...restOfProps },
			category,
		},
	}
}

export const editLocation = (location: ILocation) => {
	const { category, ...restOfProps } = location

	return {
		type: actionTypes.EDIT_LOCATION,
		payload: {
			locationData: { ...restOfProps },
			category,
		},
	}
}

export const deleteLocation = (categoryId: string, locationId: string) => {
	return {
		type: actionTypes.DELETE_LOCATION,
		payload: {
			categoryId,
			locationId,
		},
	}
}

export const setCurrentLocation = (location: ILocation) => ({
	type: actionTypes.SET_CURRENT_LOCATION,
	payload: location,
})

export const clearCurrentLocation = () => ({
	type: actionTypes.CLEAR_CURRENT_LOCATION,
})
