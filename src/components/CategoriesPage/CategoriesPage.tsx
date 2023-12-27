import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon } from 'react-materialize'
import { RootState, useAppDispatch, useAppSelector } from '../../store/store'
import { CategoryModal, CategoryTitleBar, List, Toolbar } from '../index'
import {
	clearCurrentCategory,
	deleteCategory,
	setCurrentCategory,
} from '../../actions/categoryActions'
import { ICategory } from '../../entityTypes/ICategory'
import { useOutsideOfAreaClick } from '../../hooks/useOutsideOfAreaClick'

const CategoriesPage = () => {
	const navigate = useNavigate()

	const wrapperRef = useRef<HTMLDivElement>(null)
	useOutsideOfAreaClick(wrapperRef, clearCurrentCategory)

	const categoriesState = useAppSelector(
		(state: RootState) => state.categoriesReducer
	)
	const { categories, currentCategory } = categoriesState
	const dispatch = useAppDispatch()

	const deleteFunction = () => {
		dispatch(deleteCategory(currentCategory.id))
		dispatch(clearCurrentCategory())
	}

	const onItemClick = (selectedItem: ICategory) => {
		dispatch(setCurrentCategory(selectedItem))
	}

	return (
		<div className="container" ref={wrapperRef}>
			<div className="section">
				<Toolbar
					addTooltipMsg="Add a new category"
					deleteFunction={deleteFunction}
					deleteTooltipMsg="Delete category"
					selectedItem={currentCategory}
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
							<CategoryTitleBar
								isEditMode={isEditMode}
								setIsEditMode={setIsEditMode}
							/>
							<CategoryModal
								isOpen={isOpen}
								isViewMode={isViewMode}
								selectedCategory={selectedItem}
								setIsOpen={setIsOpen}
								setIsViewMode={setIsViewMode}
							/>
						</>
					)}
				</Toolbar>
				<List
					emptyMsg="List is currently empty. Add some categories."
					listItems={categories}
					onItemClick={onItemClick}
					selectedItem={currentCategory}
				>
					{(item) => (
						<Button
							flat
							icon={<Icon>send</Icon>}
							node="button"
							onClick={() => {
								navigate(`/${item?.name}/locations`)
							}}
							tooltip={`View Locations for ${item?.name}`}
						/>
					)}
				</List>
			</div>
		</div>
	)
}

export default CategoriesPage
