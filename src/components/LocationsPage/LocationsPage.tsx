import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon } from 'react-materialize'
import { RootState, useAppDispatch, useAppSelector } from '../../store/store'
import { Toolbar, List, LocationModal, LocationTitleBar } from '../index'
import {
	clearCurrentLocation,
	deleteLocation,
	setCurrentLocation,
} from '../../actions/categoryActions'
import { ICategory } from '../../entityTypes/ICategory'
import { ILocation } from '../../entityTypes/ILocation'
import { useOutsideOfAreaClick } from '../../hooks/useOutsideOfAreaClick'

const LocationsPage = () => {
	const wrapperRef = useRef<HTMLDivElement>(null)
	useOutsideOfAreaClick(wrapperRef, clearCurrentLocation)

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
					addTooltipMsg="Add a new location"
					deleteFunction={deleteFunction}
					deleteTooltipMsg="Delete location"
					selectedItem={currentLocation}
				>
					{({
						isEditMode,
						isOpen,
						isViewMode,
						selectedItem,
						setIsEditMode,
						setIsOpen,
						setIsViewMode,
					}) => (
						<>
							<LocationTitleBar
								isEditMode={isEditMode}
								setIsEditMode={setIsEditMode}
								setIsOpen={setIsOpen}
							/>
							<LocationModal
								isEditMode={isEditMode}
								isOpen={isOpen}
								isViewMode={isViewMode}
								selectedLocation={selectedItem}
								setIsEditMode={setIsEditMode}
								setIsOpen={setIsOpen}
								setIsViewMode={setIsViewMode}
							/>
						</>
					)}
				</Toolbar>
				<List
					emptyMsg={`List for ${currentCategory.name} category is currently empty. Add some locations.`}
					listItems={listItems[0].locations}
					onItemClick={onItemClick}
					selectedItem={currentLocation}
				/>
			</div>
			<div className="section">
				<Button
					icon={<Icon left>arrow_back</Icon>}
					node="button"
					onClick={() => {
						navigate(`/`)
						dispatch(clearCurrentLocation())
					}}
				>
					Back to Categories
				</Button>
			</div>
		</div>
	)
}

export default LocationsPage
