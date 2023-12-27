import { useEffect, useRef, useState } from 'react'
import { RootState, useAppDispatch, useAppSelector } from '../../store/store'
import { Modal } from 'react-bootstrap'
import { Button, Icon } from 'react-materialize'
import { addCategory } from '../../actions/categoryActions'
import { ICategory } from '../../entityTypes/ICategory'
import { v4 as uuidv4 } from 'uuid'
import { findExisting } from '../../utils/findExisting'

import M from 'materialize-css'
import './style.scss'

interface IAddCategoryModalProps {
	isOpen: boolean
	isViewMode: boolean
	selectedCategory: ICategory
	setIsOpen: (arg: boolean) => void
	setIsViewMode: (arg: boolean) => void
}

const CategoryModal = ({
	isOpen,
	isViewMode,
	selectedCategory,
	setIsOpen,
	setIsViewMode,
}: IAddCategoryModalProps) => {
	const categoriesState = useAppSelector(
		(state: RootState) => state.categoriesReducer
	)
	const { categories: existingCategories } = categoriesState
	const [category, setCategory] = useState('')
	const fieldsRef = useRef<ICategory>()

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (selectedCategory) {
			fieldsRef.current = selectedCategory
		}
	})

	const onSubmit = () => {
		if (category === '') {
			M.toast({ html: 'Please enter a category' })
		} else if (findExisting(existingCategories, 'name', category)) {
			M.toast({ html: `Category already exists` })
		} else {
			dispatch(
				addCategory({ id: uuidv4(), name: category, locations: [] })
			)
			M.toast({ html: `New Category added` })
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
					{isViewMode ? 'Category Details' : 'Enter New Category'}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="row">
					<label htmlFor="name" className="active">
						Category Name
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
					Close
				</Button>

				<Button disabled={isViewMode} node="button" onClick={onSubmit}>
					Submit <Icon right>send</Icon>
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default CategoryModal
