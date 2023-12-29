import { useEffect, useState } from 'react'
import { Button } from 'react-materialize'
import { EditBtn } from '../../index'
import { useDispatch, useSelector } from 'react-redux'
import {
	editCategory,
	setCurrentCategory,
} from '../../../redux/old/actions/categoryActions'
import { RootState } from '../../../redux/old/reducers'
import { ICategory } from '../../../entityTypes/old/ICategory'
import { findExisting } from '../../../utils/findExisting'

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
	const [category, setCategory] = useState('')

	const categoriesState = useSelector(
		(state: RootState) => state.categoriesReducer
	)
	const {
		categories: existingCategories,
		currentCategory: selectedCategory,
	} = categoriesState
	const dispatch = useDispatch()

	useEffect(() => {
		selectedCategory && setCategory(selectedCategory.name)
	}, [selectedCategory])

	const onClick = () => {
		resetToDefault()
		toggleEditing()
	}

	const onSubmit = () => {
		if (category === '') {
			M.toast({ html: 'Please enter a category' })
		} else if (findExisting(existingCategories, 'name', category)) {
			M.toast({ html: `Category already exists` })
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
			M.toast({ html: `Category updated` })
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
					<Button onClick={onSubmit}>Submit</Button>
				</div>
			) : (
				<div className="category-title">
					{/* {selectedCategory ? category : "Select a Category"} */}
					{selectedCategory
						? selectedCategory.name
						: 'Select a Category'}
				</div>
			)}
			{selectedCategory && (
				<EditBtn
					editMode="inline"
					editingState={isEditMode}
					onClick={onClick}
					tooltipMsg="Toggle editing mode on/off"
				/>
			)}
		</div>
	)
}

export default CategoryTitleBar
