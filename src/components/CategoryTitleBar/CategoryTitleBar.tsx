import { useEffect } from 'react'
import { Button } from 'react-materialize'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { categoryActions } from '../../redux/reducers/categories/slice'
import { EditBtn } from '../index'
import { ICategory } from '../../entityTypes'
import { findExisting } from '../../utils/findExisting'
import { literals } from '../../constants'
import { FormInputs, ICategoryTitleBarProps } from './types'

import M from 'materialize-css'
import './style.scss'

const CategoryTitleBar = ({
	isEditMode,
	setIsEditMode,
}: ICategoryTitleBarProps) => {
	const {
		categoriesPage: { toolbar },
		inputsErrors,
	} = literals

	const dispatch = useAppDispatch()
	const { editCategory } = categoryActions
	const categoriesState = useAppSelector(
		(state: RootState) => state.categoriesReducer
	)
	const {
		categories,
		currentCategory,
	}: { categories: ICategory[]; currentCategory: ICategory } = categoriesState

	const formSchema = Yup.object().shape({
		id: Yup.string(),
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
		if (currentCategory) {
			reset({ name: currentCategory.name })
		}
	}, [currentCategory, reset])

	const onClick = () => {
		resetToDefault()
		toggleEditing()
	}

	const onSubmit = (data: FormInputs) => {
		if (findExisting(categories, 'name', data.name)) {
			M.toast({ html: toolbar.toast.alreadyExistsPrompt })
		} else {
			dispatch(editCategory({ id: currentCategory.id, name: data.name }))

			setIsEditMode(false)
			M.toast({ html: toolbar.toast.updatedPrompt })
		}
	}

	const resetToDefault = () => {
		if (isEditMode) {
			reset({ name: currentCategory.name })
		}
	}

	const toggleEditing = () => {
		setIsEditMode(!isEditMode)
	}

	const isCategorySelected = currentCategory && currentCategory.name

	return (
		<div className="category-title-input-container">
			{isEditMode && isCategorySelected ? (
				<div className="title-input">
					<input
						type="text"
						{...register('name', { required: true })}
					/>
					{/* <span>{errors.name && errors.name.message}</span> */}
					<Button
						disabled={!isValid}
						onClick={handleSubmit(onSubmit)}
						tooltip={errors.name && errors.name.message}
					>
						{toolbar.buttons.submit}
					</Button>
				</div>
			) : (
				<div className="category-title">
					{isCategorySelected ? currentCategory.name : toolbar.title}
				</div>
			)}
			{currentCategory && currentCategory.name && (
				<EditBtn
					editMode="inline"
					editingState={isEditMode}
					onClick={onClick}
					tooltipMsg={toolbar.tooltips.editTooltipMsg}
				/>
			)}
		</div>
	)
}

export default CategoryTitleBar
