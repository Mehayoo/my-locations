import { ILocation } from '../../../entityTypes/old/ILocation'
import * as actionTypes from '../actions/types'

interface ILocationsInitialState {
	locations: { [categoryName: string]: ILocation[] | [] }
	current: ILocation | null
}

const initialState: ILocationsInitialState = {
	locations: {},
	current: null,
}

const locationsReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case actionTypes.ADD_NEW_CATEGORY_TO_LOCATION:
			return {
				...state,
				locations: { ...state.locations, [action.payload]: [] },
			}

		case actionTypes.EDIT_CATEGORY_OF_LOCATION:
			const oldPropertyName = action.payload.oldPropertyName

			let propertyContent
			let restOfProps
			;({ [oldPropertyName]: propertyContent, ...restOfProps } =
				state.locations)

			return {
				...state,
				locations: {
					[action.payload.newPropertyName]: propertyContent,
					...restOfProps,
				},
			}
		default:
			return state
	}
}

export default locationsReducer
