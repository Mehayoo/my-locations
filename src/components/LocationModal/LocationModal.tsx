import { useCallback, useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Button, Icon } from 'react-materialize'
import { v4 as uuidv4 } from 'uuid'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { locationActions } from '../../redux/reducers/locations/slice'
import { ILocation } from '../../entityTypes'
import { nestedPropertyIsEmpty } from '../../utils/nestedPropertyIsEmpty'
import { nestedPropertyExists } from '../../utils/nestedPropertyExists'
import { Icons, literals } from '../../constants'
import { ILocationModalProps } from './types'

import M from 'materialize-css'
import './style.scss'

const LocationModal = ({
	isEditMode,
	isOpen,
	isViewMode,
	selectedLocation,
	setIsEditMode,
	setIsOpen,
	setIsViewMode,
}: ILocationModalProps) => {
	const {
		locationsPage: {
			modal: { buttons, createTitle, form, toast, viewTitle },
		},
	} = literals
	const dispatch = useAppDispatch()
	const { addLocation, editLocation } = locationActions
	const currentCategory = useAppSelector(
		(state: RootState) => state.categoriesReducer.currentCategory
	)

	const [location, setLocation] = useState<ILocation>({
		name: '',
		address: '',
		coordinates: {
			lat: null,
			lng: null,
		},
		categoryId: currentCategory.id!,
	})
	const selectedLocationId = useRef('')

	const resetFieldsValue = useCallback(() => {
		setLocation({
			name: '',
			address: '',
			coordinates: {
				lat: null,
				lng: null,
			},
			categoryId: currentCategory.id!,
		})
	}, [currentCategory.id])

	useEffect(() => {
		if (selectedLocation) {
			const { id, ...restOfProps } = selectedLocation
			selectedLocationId.current = id!
			setLocation(restOfProps)
		}
		if (isOpen && !isEditMode && !isViewMode) {
			resetFieldsValue()
		}
	}, [isEditMode, isOpen, isViewMode, resetFieldsValue, selectedLocation])

	const onSubmit = () => {
		if (isEditMode) {
			if (!nestedPropertyIsEmpty(location)) {
				dispatch(
					editLocation({
						...location,
						id: selectedLocationId.current,
						categoryId: currentCategory.id!,
					})
				)

				M.toast({ html: toast.updatedPrompt })
				resetFieldsValue()
				setIsOpen(false)
			}
		} else {
			if (
				!(
					nestedPropertyIsEmpty(location)
					// ||
					// nestedPropertyExists(location, currentCategory.locations)
				)
			) {
				dispatch(
					addLocation({
						...location,
						id: uuidv4(),
						categoryId: currentCategory.id!,
					})
				)
				M.toast({ html: toast.addedPrompt })
				resetFieldsValue()
				setIsOpen(false)
			}
		}
	}

	return (
		<Modal
			aria-labelledby="contained-modal-title-vcenter"
			centered
			className="location-modal"
			show={isOpen}
			size="sm"
		>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					{isViewMode ? viewTitle : createTitle}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="row">
					<label htmlFor="name" className="active">
						{form.locationName}
					</label>
					<input
						disabled={isViewMode}
						name="name"
						type="text"
						value={location?.name ?? ''}
						onChange={(e) =>
							setLocation({
								...location,
								[e.target.name]: e.target.value,
							})
						}
					/>
				</div>

				<div className="row">
					<label htmlFor="address" className="active">
						{form.locationAddress}
					</label>
					<input
						disabled={isViewMode}
						name="address"
						type="text"
						value={location?.address ?? ''}
						onChange={(e) =>
							setLocation({
								...location,
								[e.target.name]: e.target.value,
							})
						}
					/>
				</div>

				<div className="row col s12">
					<div className="col s6">
						<label className="active" htmlFor="lat">
							{form.locationLatitude}
						</label>
						<input
							disabled={isViewMode}
							name="lat"
							type="number"
							value={location?.coordinates?.lat ?? ''}
							onChange={(e) =>
								setLocation({
									...location,
									coordinates: {
										...location.coordinates,
										[e.target.name]:
											e.target.value === ''
												? null
												: Number(e.target.value),
									},
								})
							}
						/>
					</div>
					<div className="col s6">
						<label className="active" htmlFor="lng">
							{form.locationLongitude}
						</label>
						<input
							disabled={isViewMode}
							name="lng"
							type="number"
							value={location?.coordinates?.lng ?? ''}
							onChange={(e) => {
								setLocation({
									...location,
									coordinates: {
										...location.coordinates,
										[e.target.name]:
											e.target.value === ''
												? null
												: Number(e.target.value),
									},
								})
							}}
						/>
					</div>
				</div>

				<div className="row">
					<label htmlFor="category.name" className="active">
						{form.locationCategory}
					</label>
					<input
						disabled
						name="category.name"
						type="text"
						value={currentCategory.name}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="red"
					node="button"
					onClick={() => {
						resetFieldsValue()
						setIsEditMode(false)
						setIsOpen(false)
						setIsViewMode(false)
					}}
				>
					{buttons.close}
				</Button>

				<Button disabled={isViewMode} node="button" onClick={onSubmit}>
					<Icon right>{Icons.SEND}</Icon>
					{buttons.submit}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default LocationModal
