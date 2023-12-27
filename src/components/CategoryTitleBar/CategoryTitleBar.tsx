import { useEffect, useState } from 'react'
import { Button } from 'react-materialize'
import { RootState, useAppDispatch, useAppSelector } from '../../store/store'
import { editCategory, setCurrentCategory } from '../../actions/categoryActions'
import { EditBtn } from '../index'
import { findExisting } from '../../utils/findExisting'
import { literals } from '../../constants'

import M from 'materialize-css'
import './style.scss'

interface ICategoryTitleBarProps {
	isEditMode: boolean
	setIsEditMode: (arg: boolean) => void
}

const CategoryTitleBar = ({
	isEditMode,
	setIsEditMode,
}: ICategoryTitleBarProps) => {
	const {
		categoriesPage: { toolbar },
	} = literals
	const [category, setCategory] = useState('')

	const categoriesState = useAppSelector(
		(state: RootState) => state.categoriesReducer
	)
	const {
		categories: existingCategories,
		currentCategory: selectedCategory,
	} = categoriesState
	const dispatch = useAppDispatch()

	useEffect(() => {
		selectedCategory && setCategory(selectedCategory.name)
	}, [selectedCategory])

	const onClick = () => {
		resetToDefault()
		toggleEditing()
	}

	const onSubmit = () => {
		if (category === '') {
			M.toast({ html: toolbar.toast.addPrompt })
		} else if (findExisting(existingCategories, 'name', category)) {
			M.toast({ html: toolbar.toast.alreadyExistsPrompt })
		} else {
			dispatch(
				editCategory({
					id: selectedCategory.id,
					name: category,
					locations: selectedCategory.locations,
				})
			)
			dispatch(
				setCurrentCategory({
					id: selectedCategory.id,
					name: category,
					locations: selectedCategory.locations,
				})
			)

			setIsEditMode(false)
			M.toast({ html: toolbar.toast.updatedPrompt })
		}
	}

	const resetToDefault = () => {
		if (isEditMode) {
			setCategory(selectedCategory.name)
		}
	}

	const toggleEditing = () => {
		setIsEditMode(!isEditMode)
	}

	return (
		<div className="category-title-input-container">
			{isEditMode && selectedCategory ? (
				<div className="title-input">
					<input
						name="category"
						onChange={(e) => setCategory(e.target.value)}
						type="text"
						value={category}
					/>
					<Button onClick={onSubmit}>{toolbar.buttons.submit}</Button>
				</div>
			) : (
				<div className="category-title">
					{/* {selectedCategory ? category : toolbar.title} */}
					{selectedCategory ? selectedCategory.name : toolbar.title}
				</div>
			)}
			{selectedCategory && (
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
