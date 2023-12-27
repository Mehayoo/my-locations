import { useEffect, useRef, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Button, Icon } from 'react-materialize'
import { v4 as uuidv4 } from 'uuid'
import { RootState, useAppDispatch, useAppSelector } from '../../store/store'
import { addCategory } from '../../actions/categoryActions'
import { ICategory } from '../../entityTypes'
import { findExisting } from '../../utils/findExisting'
import { Icons, literals } from '../../constants'

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
	const {
		categoriesPage: { modal },
	} = literals
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
			M.toast({ html: modal.toast.addPrompt })
		} else if (findExisting(existingCategories, 'name', category)) {
			M.toast({ html: modal.toast.alreadyExistsPrompt })
		} else {
			dispatch(
				addCategory({ id: uuidv4(), name: category, locations: [] })
			)
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
