import { useRef, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Button, Icon } from 'react-materialize'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { locationActions } from '../../redux/reducers/locations/slice'
import { Toolbar, List, LocationModal, LocationTitleBar } from '../index'
import {
	ICategoriesState,
	ICategory,
	ILocation,
	ILocationsState,
} from '../../entityTypes'
import { useOutsideOfAreaClick } from '../../hooks/useOutsideOfAreaClick'
import { Icons, literals } from '../../constants'

const LocationsPage = () => {
	const {
		locationsPage: { buttons, emptyList, toolbar },
	} = literals
	const navigate: NavigateFunction = useNavigate()

	const [isModalOpen, setIsModalOpen] = useState(false)

	const dispatch = useAppDispatch()
	const { clearCurrentLocation, deleteLocation, setCurrentLocation } =
		locationActions
	const categoriesState: ICategoriesState = useAppSelector(
		(state: RootState) => state.categoriesReducer
	)
	const locationsState: ILocationsState = useAppSelector(
		(state: RootState) => state.locationsReducer
	)
	const { currentCategory }: { currentCategory: ICategory } = categoriesState
	const {
		locations,
		currentLocation,
	}: { locations: ILocation[]; currentLocation: ILocation } = locationsState

	const wrapperRef = useRef<HTMLDivElement>(null)
	useOutsideOfAreaClick(wrapperRef, clearCurrentLocation, isModalOpen)

	const deleteFunction = (): void => {
		dispatch(deleteLocation(currentLocation.id!))
		dispatch(clearCurrentLocation())
	}

	const onItemClick = (selectedItem: ILocation): void => {
		dispatch(setCurrentLocation(selectedItem))
	}

	const listItems: ILocation[] = locations.filter(
		(location: ILocation) => location.categoryId === currentCategory.id
	)

	return (
		<div className="container" ref={wrapperRef}>
			<div className="section">
				<Toolbar<ILocation>
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
				<List<ILocation>
					emptyMsg={emptyList(currentCategory.name)}
					listItems={listItems}
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
