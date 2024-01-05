import React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Button, Icon, Modal } from 'react-materialize'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../../../redux/old/actions/categoryActions'
import { RootState } from '../../../redux/old/reducers'
import { ICategory } from '../../../entityTypes/old/ICategory'
import { v4 as uuidv4 } from 'uuid'
import { findExisting } from '../../../utils/findExisting'

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
	const categoriesState = useSelector(
		(state: RootState) => state.categoriesReducer
	)
	const { categories: existingCategories } = categoriesState
	const [category, setCategory] = useState('')
	const fieldsRef = useRef<ICategory>()

	const dispatch = useDispatch()

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
		// Added bc I wanted to keep the old way I did things, but after upgrading to react 18, I don't want to bother with fixing this component which is not of use anymore
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		<Modal
			actions={[]}
			header={isViewMode ? 'Category Details' : 'Enter New Category'}
			id="category-modal"
			open={isOpen}
			options={{ dismissible: false }}
		>
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

			<div className="modal-footer">
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
					<Icon right>send</Icon>Submit
				</Button>
			</div>
		</Modal>
	)
}

export default CategoryModal
