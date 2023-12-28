import { useEffect, useState } from 'react'
import { Button } from 'react-materialize'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { categoryActions } from '../../redux/reducers/categories/slice'
import { EditBtn } from '../index'
import { findExisting } from '../../utils/findExisting'
import { ICategory } from '../../entityTypes'
import { literals } from '../../constants'
import { ICategoryTitleBarProps } from './types'

import M from 'materialize-css'
import './style.scss'

const CategoryTitleBar = ({
	isEditMode,
	setIsEditMode,
}: ICategoryTitleBarProps) => {
	const {
		categoriesPage: { toolbar },
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

	const [category, setCategory] = useState<string>('')

	useEffect(() => {
		currentCategory && setCategory(currentCategory.name)
	}, [currentCategory])

	const onClick = () => {
		resetToDefault()
		toggleEditing()
	}

	const onSubmit = () => {
		if (category === '') {
			M.toast({ html: toolbar.toast.addPrompt })
		} else if (findExisting(categories, 'name', category)) {
			M.toast({ html: toolbar.toast.alreadyExistsPrompt })
		} else {
			dispatch(
				editCategory({
					id: currentCategory.id,
					name: category,
				})
			)

			setIsEditMode(false)
			M.toast({ html: toolbar.toast.updatedPrompt })
		}
	}

	const resetToDefault = () => {
		if (isEditMode) {
			setCategory(currentCategory.name)
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
						name="category"
						onChange={(e) => setCategory(e.target.value)}
						type="text"
						value={category}
					/>
					<Button onClick={onSubmit}>{toolbar.buttons.submit}</Button>
				</div>
			) : (
				<div className="category-title">
					{/* {currentCategory ? category : toolbar.title} */}
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
