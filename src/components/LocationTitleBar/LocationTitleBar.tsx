import { EditBtn } from '../index'
import { RootState, useAppSelector } from '../../store/store'

import './style.scss'

interface ILocationTitleBarProps {
	isEditMode: boolean
	setIsEditMode: (arg: boolean) => void
	setIsOpen: (arg: boolean) => void
}

const LocationTitleBar = ({
	isEditMode,
	setIsEditMode,
	setIsOpen,
}: ILocationTitleBarProps) => {
	const categoriesState = useAppSelector(
		(state: RootState) => state.categoriesReducer
	)
	const { currentLocation: selectedLocation } = categoriesState

	const onClick = () => {
		setIsEditMode(true)
		setIsOpen(true)
	}

	return (
		<div className="location-title-container">
			<div className="location-title">
				{selectedLocation ? selectedLocation.name : 'Select a Location'}
			</div>
			{selectedLocation && (
				<EditBtn
					editMode="popup"
					editingState={isEditMode}
					onClick={onClick}
					tooltipMsg="Edit location"
				/>
			)}
		</div>
	)
}

export default LocationTitleBar
