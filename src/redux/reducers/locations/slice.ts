import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ILocation, ILocationsState } from '../../../entityTypes'

const initialState: ILocationsState = {
	locations: [],
	currentLocation: {} as ILocation,
}

const locationsSlice = createSlice({
	name: 'locations',
	initialState,
	reducers: {
		reset: () => initialState,
		addLocation: (state, action: PayloadAction<ILocation>) => {
			state.locations.push(action.payload)
			state.currentLocation = action.payload
		},
		editLocation: (state, action: PayloadAction<ILocation>) => {
			const index = state.locations.findIndex(
				(location: ILocation) => location.id === action.payload.id
			)
			state.locations[index] = action.payload
			state.currentLocation = action.payload
		},
		deleteLocation: (state, action: PayloadAction<string>) => {
			const index = state.locations.findIndex(
				(location: ILocation) => location.id === action.payload
			)
			state.locations.splice(index, 1)
		},
		setCurrentLocation: (state, action: PayloadAction<ILocation>) => {
			state.currentLocation = action.payload
		},
		clearCurrentLocation: (state) => {
			state.currentLocation = {} as ILocation
		},
	},
})

export const { actions: locationActions, reducer: locationsReducer } =
	locationsSlice
