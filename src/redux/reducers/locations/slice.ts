import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import {
	ILocation,
	ILocationDraft,
	ILocationsState,
} from '../../../entityTypes'

const initialState: ILocationsState = {
	locations: [],
	currentLocation: {} as ILocation,
}

const locationsSlice = createSlice({
	name: 'locations',
	initialState,
	reducers: {
		reset: () => initialState,
		addLocation: {
			reducer: (
				state: ILocationsState,
				action: PayloadAction<ILocation>
			): void => {
				state.locations.push(action.payload)
				state.currentLocation = action.payload
			},
			prepare: (location: ILocationDraft) => ({
				payload: {
					id: uuidv4(),
					...location,
				},
			}),
		},
		editLocation: (
			state: ILocationsState,
			action: PayloadAction<ILocation>
		): void => {
			const index = state.locations.findIndex(
				(location: ILocation) => location.id === action.payload.id
			)
			state.locations[index] = action.payload
			state.currentLocation = action.payload
		},
		deleteLocation: (
			state: ILocationsState,
			action: PayloadAction<string>
		): void => {
			const index = state.locations.findIndex(
				(location: ILocation) => location.id === action.payload
			)
			state.locations.splice(index, 1)
		},
		setCurrentLocation: (
			state: ILocationsState,
			action: PayloadAction<ILocation>
		): void => {
			state.currentLocation = action.payload
		},
		clearCurrentLocation: (state: ILocationsState): void => {
			state.currentLocation = {} as ILocation
		},
	},
})

export const { actions: locationActions, reducer: locationsReducer } =
	locationsSlice
