import { ReactElement, useState } from 'react'
import { Button, Icon } from 'react-materialize'

import './style.scss'

interface IToolbarProps {
	addTooltipMsg: string
	children?: (data?: any) => ReactElement
	deleteFunction: () => void
	deleteTooltipMsg: string
	isModalOpen: boolean
	selectedItem: any
	setIsModalOpen: (arg: boolean) => void
}

const Toolbar = ({
	addTooltipMsg,
	children,
	deleteFunction,
	deleteTooltipMsg,
	isModalOpen,
	selectedItem,
	setIsModalOpen,
}: IToolbarProps) => {
	// const [isOpen, setIsOpen] = useState(false)
	const [isViewMode, setIsViewMode] = useState(false)
	const [isEditMode, setIsEditMode] = useState(false)

	return (
		<nav className="amber accent-4">
			<div className="nav-wrapper toolbar">
				{children &&
					children({
						isEditMode,
						isViewMode,
						selectedItem,
						setIsEditMode,
						setIsViewMode,
					})}

				{selectedItem && (
					<Button
						className="grey"
						floating
						icon={<Icon>remove_red_eye</Icon>}
						node="button"
						onClick={() => {
							setIsModalOpen(true)
							setIsViewMode(true)
						}}
						small
						style={{ marginLeft: '1rem' }}
						tooltip="View details"
						waves="light"
					/>
				)}

				{selectedItem && (
					<Button
						className="red"
						floating
						icon={<Icon>delete</Icon>}
						node="button"
						onClick={deleteFunction}
						small
						style={{ marginLeft: '1rem' }}
						tooltip={deleteTooltipMsg}
						waves="light"
					/>
				)}

				<div className="add-btn-container">
					<Button
						className="green"
						floating
						icon={<Icon>add</Icon>}
						node="button"
						onClick={() => {
							setIsModalOpen(true)
						}}
						small
						style={{ marginRight: '1rem' }}
						tooltip={addTooltipMsg}
						waves="light"
					/>
				</div>
			</div>
		</nav>
	)
}

export default Toolbar
