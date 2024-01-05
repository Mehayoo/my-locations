import React from 'react'
import { useEffect } from 'react'
import { Modal } from 'react-bootstrap'
import { Button, Icon } from 'react-materialize'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { categoryActions } from '../../redux/reducers/categories/slice'
import { ICategoriesState, ICategory } from '../../entityTypes'
import { findExisting } from '../../utils/findExisting'
import { Icons, literals } from '../../constants'
import { FormInputs, IAddCategoryModalProps } from './types'

import M from 'materialize-css'
import './style.scss'

const CategoryModal = ({
	isOpen,
	isViewMode,
	selectedCategory,
	setIsOpen,
	setIsViewMode,
}: IAddCategoryModalProps) => {
	const {
		categoriesPage: { modal },
		inputsErrors,
	} = literals

	const dispatch = useAppDispatch()
	const { addCategory } = categoryActions
	const categoriesState: ICategoriesState = useAppSelector(
		(state: RootState) => state.categoriesReducer
	)
	const { categories }: { categories: ICategory[] } = categoriesState

	const formSchema = Yup.object().shape({
		name: Yup.string()
			.required(inputsErrors.required)
			.min(3, inputsErrors.minLength(3)),
	})
	const { formState, handleSubmit, register, reset } = useForm<FormInputs>({
		resolver: yupResolver(formSchema),
		mode: 'all',
	})
	const { errors, isValid } = formState

	useEffect(() => {
		if (selectedCategory && isViewMode) {
			reset({ name: selectedCategory.name })
		} else {
			reset({ name: '' })
		}
	}, [isViewMode, reset, selectedCategory])

	const onSubmit = (data: FormInputs) => {
		if (findExisting(categories, 'name', data.name)) {
			M.toast({ html: modal.toast.alreadyExistsPrompt })
		} else {
			dispatch(addCategory({ name: data.name }))
			M.toast({ html: modal.toast.addedPrompt })
			setIsOpen(false)
		}
	}

	return (
		<Modal
			aria-labelledby="contained-modal-title-vcenter"
			centered
			className="category-modal"
			show={isOpen}
			size="sm"
		>
			<Modal.Header>
				<Modal.Title id="contained-modal-title-vcenter">
					{isViewMode ? modal.viewTitle : modal.createTitle}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="row">
					<label htmlFor="name" className="active">
						{modal.form.categoryName}
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
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="red"
					node="button"
					onClick={() => {
						reset({ name: '' })
						setIsOpen(false)
						setIsViewMode(false)
					}}
				>
					{modal.buttons.close}
				</Button>

				<Button
					disabled={isViewMode || !isValid}
					node="button"
					onClick={handleSubmit(onSubmit)}
				>
					{modal.buttons.submit} <Icon right>{Icons.SEND}</Icon>
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CategoryModal
