import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon } from 'react-materialize'
import { RootState, useAppDispatch, useAppSelector } from '../../store/store'
import {
	clearCurrentLocation,
	deleteLocation,
	setCurrentLocation,
} from '../../actions/categoryActions'
import { Toolbar, List, LocationModal, LocationTitleBar } from '../index'
import { ICategory, ILocation } from '../../entityTypes'
import { useOutsideOfAreaClick } from '../../hooks/useOutsideOfAreaClick'
import { Icons, literals } from '../../constants'

const LocationsPage = () => {
	const {
		locationsPage: { buttons, emptyList, toolbar },
	} = literals
	const [isModalOpen, setIsModalOpen] = useState(false)

	const wrapperRef = useRef<HTMLDivElement>(null)
	useOutsideOfAreaClick(wrapperRef, clearCurrentLocation, isModalOpen)

	const appState = useAppSelector(
		(state: RootState) => state.categoriesReducer
	)
	const { categories, currentCategory, currentLocation } = appState
	const dispatch = useAppDispatch()

	const navigate = useNavigate()

	const deleteFunction = () => {
		dispatch(deleteLocation(currentCategory.id, currentLocation.id!))
		dispatch(clearCurrentLocation())
	}

	const listItems = (categories as ICategory[]).filter(
		(category: any) => category.id === currentCategory.id
	)

	const onItemClick = (selectedItem: ILocation) => {
		dispatch(setCurrentLocation(selectedItem))
	}

	return (
		<div className="container" ref={wrapperRef}>
			<div className="section">
				<Toolbar
					addTooltipMsg={toolbar.tooltips.addTooltipMsg}
					deleteFunction={deleteFunction}
					deleteTooltipMsg={toolbar.tooltips.deleteTooltipMsg}
					selectedItem={currentLocation}
					setIsModalOpen={setIsModalOpen}
				>
					{({
						isEditMode,
						isViewMode,
						selectedItem,
						setIsEditMode,
						setIsViewMode,
					}) => (
						<>
							<LocationTitleBar
								isEditMode={isEditMode}
								setIsEditMode={setIsEditMode}
								setIsOpen={setIsModalOpen}
							/>
							<LocationModal
								isEditMode={isEditMode}
								isOpen={isModalOpen}
								isViewMode={isViewMode}
								selectedLocation={selectedItem}
								setIsEditMode={setIsEditMode}
								setIsOpen={setIsModalOpen}
								setIsViewMode={setIsViewMode}
							/>
						</>
					)}
				</Toolbar>
				<List
					emptyMsg={emptyList(currentCategory.name)}
					listItems={listItems[0].locations}
					onItemClick={onItemClick}
					selectedItem={currentLocation}
				/>
			</div>
			<div className="section">
				<Button
					icon={<Icon left>{Icons.ARROW_BACK}</Icon>}
					node="button"
					onClick={() => {
						navigate(`/`)
						dispatch(clearCurrentLocation())
					}}
				>
					{buttons.back}
				</Button>
			</div>
		</div>
	)
}

export default LocationsPage
