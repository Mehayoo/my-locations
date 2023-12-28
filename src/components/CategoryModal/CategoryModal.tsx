import { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Button, Icon } from 'react-materialize'
import { v4 as uuidv4 } from 'uuid'
import { RootState, useAppDispatch, useAppSelector } from '../../redux/store'
import { categoryActions } from '../../redux/reducers/categories/slice'
import { ICategoriesState, ICategory } from '../../entityTypes'
import { findExisting } from '../../utils/findExisting'
import { Icons, literals } from '../../constants'
import { IAddCategoryModalProps } from './types'

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
	} = literals

	const dispatch = useAppDispatch()
	const { addCategory } = categoryActions
	const categoriesState: ICategoriesState = useAppSelector(
		(state: RootState) => state.categoriesReducer
	)
	const { categories }: { categories: ICategory[] } = categoriesState

	const [category, setCategory] = useState<string>('')

	const fieldsRef = useRef<ICategory>()

	useEffect(() => {
		if (selectedCategory) {
			fieldsRef.current = selectedCategory
		}
	})

	const onSubmit = (): void => {
		if (category === '') {
			M.toast({ html: modal.toast.addPrompt })
		} else if (findExisting(categories, 'name', category)) {
			M.toast({ html: modal.toast.alreadyExistsPrompt })
		} else {
			dispatch(addCategory({ id: uuidv4(), name: category }))
			M.toast({ html: modal.toast.addedPrompt })
			setCategory('')
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
					<input
						disabled={isViewMode}
						name="name"
						type="text"
						value={
							isViewMode && fieldsRef.current
								? fieldsRef.current.name
								: category
						}
						onChange={(e) => {
							setCategory(e.target.value)
						}}
					/>
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button
					className="red"
					node="button"
					onClick={() => {
						setCategory('')
						setIsOpen(false)
						setIsViewMode(false)
					}}
				>
					{modal.buttons.close}
				</Button>

				<Button disabled={isViewMode} node="button" onClick={onSubmit}>
					{modal.buttons.submit} <Icon right>{Icons.SEND}</Icon>
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CategoryModal
