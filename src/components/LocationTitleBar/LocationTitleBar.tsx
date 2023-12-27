import { RootState, useAppSelector } from '../../store/store'
import { EditBtn } from '../index'
import { literals } from '../../constants'

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
	const {
		locationsPage: {
			toolbar: { title, tooltips },
		},
	} = literals
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
				{selectedLocation ? selectedLocation.name : title}
			</div>
			{selectedLocation && (
				<EditBtn
					editMode="popup"
					editingState={isEditMode}
					onClick={onClick}
					tooltipMsg={tooltips.editTooltipMsg}
				/>
			)}
		</div>
	)
}

export default LocationTitleBar
