import { RootState, useAppSelector } from '../../redux/store'
import { EditBtn } from '../index'
import { ILocation, ILocationsState } from '../../entityTypes'
import { literals } from '../../constants'
import { ILocationTitleBarProps } from './types'

import './style.scss'

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
	const locationsState: ILocationsState = useAppSelector(
		(state: RootState) => state.locationsReducer
	)
	const { currentLocation }: { currentLocation: ILocation } = locationsState

	const onClick = (): void => {
		setIsEditMode(true)
		setIsOpen(true)
	}

	return (
		<div className="location-title-container">
			<div className="location-title">
				{currentLocation && currentLocation.name
					? currentLocation.name
					: title}
			</div>
			{currentLocation && Object.keys(currentLocation).length > 0 && (
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
