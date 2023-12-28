import { useRef, useState } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { Button, Icon } from 'react-materialize'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { categoryActions } from '../../redux/reducers/categories/slice'
import { CategoryModal, CategoryTitleBar, List, Toolbar } from '../index'
import { ICategoriesState, ICategory } from '../../entityTypes'
import { useOutsideOfAreaClick } from '../../hooks/useOutsideOfAreaClick'
import { Icons, literals } from '../../constants'

const CategoriesPage = () => {
	const {
		categoriesPage: { buttons, emptyList, toolbar },
	} = literals
	const navigate: NavigateFunction = useNavigate()

	const dispatch = useAppDispatch()
	const { clearCurrentCategory, deleteCategory, setCurrentCategory } =
		categoryActions
	const categoriesState: ICategoriesState = useAppSelector(
		(state: RootState) => state.categoriesReducer
	)
	const {
		categories,
		currentCategory,
	}: { categories: ICategory[]; currentCategory: ICategory } = categoriesState

	const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

	const wrapperRef = useRef<HTMLDivElement>(null)
	useOutsideOfAreaClick(wrapperRef, clearCurrentCategory, isModalOpen)

	const deleteFunction = (): void => {
		dispatch(deleteCategory(currentCategory.id!))
		dispatch(clearCurrentCategory())
	}

	const onItemClick = (selectedItem: ICategory): void => {
		dispatch(setCurrentCategory(selectedItem))
	}

	return (
		<div className="container" ref={wrapperRef}>
			<div className="section">
				<Toolbar<ICategory>
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
				<List<ICategory>
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
