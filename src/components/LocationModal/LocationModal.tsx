import { useCallback, useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { Button, Icon } from 'react-materialize'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { locationActions } from '../../redux/reducers/locations/slice'
import { ICategory, ILocation } from '../../entityTypes'
import { nestedPropertyExists } from '../../utils/nestedPropertyExists'
import { Icons, literals } from '../../constants'
import { FormInputs, ILocationModalProps } from './types'

import M from 'materialize-css'
import './style.scss'

const LocationModal = ({
	categoryLocations,
	isEditMode,
	isOpen,
	isViewMode,
	setIsEditMode,
	setIsOpen,
	setIsViewMode,
}: ILocationModalProps) => {
	const {
		locationsPage: {
			modal: { buttons, createTitle, form, toast, viewTitle },
		},
		inputsErrors,
	} = literals
	const dispatch = useAppDispatch()
	const { addLocation, editLocation } = locationActions
	const currentCategory: ICategory = useAppSelector(
		(state: RootState) => state.categoriesReducer.currentCategory
	)
	const currentLocation: ILocation = useAppSelector(
		(state: RootState) => state.locationsReducer.currentLocation
	)

	const coordinatesSchema = Yup.object().shape({
		lat: Yup.number()
			.required(inputsErrors.required)
			.typeError(inputsErrors.mustBeNumber)
			.min(-90, inputsErrors.getMin(-90))
			.max(90, inputsErrors.getMax(90))
			.nullable(),

		lng: Yup.number()
			.required(inputsErrors.required)
			.typeError(inputsErrors.mustBeNumber)
			.min(-180, inputsErrors.getMin(-180))
			.max(180, inputsErrors.getMax(180))
			.nullable(),
	})
	const formSchema = Yup.object().shape({
		name: Yup.string()
			.required(inputsErrors.required)
			.min(3, inputsErrors.minLength(3)),
		address: Yup.string()
			.required(inputsErrors.required)
			.min(3, inputsErrors.minLength(3)),
		coordinates: coordinatesSchema,
	})
	const { formState, handleSubmit, register, reset } = useForm<FormInputs>({
		resolver: yupResolver(formSchema),
		mode: 'all',
	})
	const { errors, isValid } = formState

	const resetFieldsValue = useCallback(
		(data?: FormInputs) => {
			const {
				name = '',
				address = '',
				coordinates: { lat = null, lng = null } = {},
			} = data || {}
			reset({
				name,
				address,
				coordinates: {
					lat,
					lng,
				},
			})
		},
		[reset]
	)

	useEffect(() => {
		if (currentLocation && Object.keys(currentLocation).length) {
			const {
				name,
				address,
				coordinates: { lat, lng },
			} = currentLocation
			resetFieldsValue({
				name,
				address,
				coordinates: {
					lat,
					lng,
				},
			})
		}
		if (isOpen && !isEditMode && !isViewMode) {
			resetFieldsValue()
		}
	}, [currentLocation, resetFieldsValue, isEditMode, isOpen, isViewMode])

	const onSubmit = (data: FormInputs) => {
		if (isEditMode) {
			dispatch(
				editLocation({
					...data,
					id: currentLocation.id,
					categoryId: currentCategory.id,
				})
			)

			M.toast({ html: toast.updatedPrompt })
			resetFieldsValue()
			setIsOpen(false)
		} else {
			if (!nestedPropertyExists(data, categoryLocations)) {
				dispatch(
					addLocation({
						...data,
						categoryId: currentCategory.id,
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
					<div className="input-container">
						<input
							disabled={isViewMode}
							type="text"
							{...register('name', { required: true })}
						/>
						{errors.name && (
							<span className="error-container">
								{errors.name.message}
							</span>
						)}
					</div>
				</div>

				<div className="row">
					<label htmlFor="address" className="active">
						{form.locationAddress}
					</label>
					<div className="input-container">
						<input
							disabled={isViewMode}
							type="text"
							{...register('address', { required: true })}
						/>
						{errors.address && (
							<span className="error-container">
								{errors.address.message}
							</span>
						)}
					</div>
				</div>

				<div className="row col s12">
					<div className="col s6">
						<label className="active" htmlFor="lat">
							{form.locationLatitude}
						</label>
						<div className="input-container">
							<input
								disabled={isViewMode}
								type="number"
								{...register('coordinates.lat', {
									required: true,
								})}
							/>
							{errors.coordinates?.lat && (
								<span className="error-container">
									{errors.coordinates.lat.message}
								</span>
							)}
						</div>
					</div>
					<div className="col s6">
						<label className="active" htmlFor="lng">
							{form.locationLongitude}
						</label>
						<div className="input-container">
							<input
								disabled={isViewMode}
								type="number"
								{...register('coordinates.lng', {
									required: true,
								})}
							/>
							{errors.coordinates?.lng && (
								<span className="error-container">
									{errors.coordinates.lng.message}
								</span>
							)}
						</div>
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

				<Button
					disabled={isViewMode || !isValid}
					node="button"
					onClick={handleSubmit(onSubmit)}
				>
					<Icon right>{Icons.SEND}</Icon>
					{buttons.submit}
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default LocationModal
