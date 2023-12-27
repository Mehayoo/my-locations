import { ReactElement, useState } from 'react'
import { Button, Icon } from 'react-materialize'

import './style.scss'

interface IToolbarProps {
	addTooltipMsg: string
	children?: (data?: any) => ReactElement
	deleteFunction: () => void
	deleteTooltipMsg: string
	selectedItem: any
}

const Toolbar = ({
	addTooltipMsg,
	children,
	deleteFunction,
	deleteTooltipMsg,
	selectedItem,
}: IToolbarProps) => {
	const [isOpen, setIsOpen] = useState(false)
	const [isViewMode, setIsViewMode] = useState(false)
	const [isEditMode, setIsEditMode] = useState(false)

	return (
		<nav className="amber accent-4">
			<div className="nav-wrapper toolbar">
				{children &&
					children({
						isEditMode,
						isOpen,
						isViewMode,
						selectedItem,
						setIsEditMode,
						setIsOpen,
						setIsViewMode,
					})}

				{selectedItem && (
					<Button
						className="grey"
						floating
						icon={<Icon>remove_red_eye</Icon>}
						node="button"
						onClick={() => {
							setIsOpen(true)
							setIsViewMode(true)
						}}
						small
						style={{ marginLeft: '15px' }}
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
						style={{ marginLeft: '15px' }}
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
							setIsOpen(true)
						}}
						small
						style={{ marginRight: '15px' }}
						tooltip={addTooltipMsg}
						waves="light"
					/>
				</div>
			</div>
		</nav>
	)
}

export default Toolbar
