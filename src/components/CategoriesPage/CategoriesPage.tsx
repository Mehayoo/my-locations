import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon } from 'react-materialize'
import { RootState, useAppDispatch, useAppSelector } from '../../store/store'
import {
	clearCurrentCategory,
	deleteCategory,
	setCurrentCategory,
} from '../../actions/categoryActions'
import { CategoryModal, CategoryTitleBar, List, Toolbar } from '../index'
import { ICategory } from '../../entityTypes'
import { useOutsideOfAreaClick } from '../../hooks/useOutsideOfAreaClick'
import { Icons, literals } from '../../constants'

const CategoriesPage = () => {
	const {
		categoriesPage: { buttons, emptyList, toolbar },
	} = literals
	const navigate = useNavigate()
	const [isModalOpen, setIsModalOpen] = useState(false)

	const wrapperRef = useRef<HTMLDivElement>(null)
	useOutsideOfAreaClick(wrapperRef, clearCurrentCategory, isModalOpen)

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
					addTooltipMsg={toolbar.tooltips.addTooltipMsg}
					deleteFunction={deleteFunction}
					deleteTooltipMsg={toolbar.tooltips.deleteTooltipMsg}
					selectedItem={currentCategory}
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
							<CategoryTitleBar
								isEditMode={isEditMode}
								setIsEditMode={setIsEditMode}
							/>
							<CategoryModal
								isOpen={isModalOpen}
								isViewMode={isViewMode}
								selectedCategory={selectedItem}
								setIsOpen={setIsModalOpen}
								setIsViewMode={setIsViewMode}
							/>
						</>
					)}
				</Toolbar>
				<List
					emptyMsg={emptyList}
					listItems={categories}
					onItemClick={onItemClick}
					selectedItem={currentCategory}
				>
					{(item) => (
						<Button
							flat
							icon={<Icon>{Icons.SEND}</Icon>}
							node="button"
							onClick={() => {
								navigate(`/${item?.name}/locations`)
							}}
							tooltip={buttons.viewLocationsTooltip(item?.name)}
						/>
					)}
				</List>
			</div>
		</div>
	)
}

export default CategoriesPage
