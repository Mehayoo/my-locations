import { ReactElement, useState } from 'react'
import { Button, Icon } from 'react-materialize'
import { Icons } from '../../constants/icons'

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
						icon={<Icon>{Icons.VIEW_DETAILS}</Icon>}
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
						icon={<Icon>{Icons.DELETE}</Icon>}
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
						icon={<Icon>{Icons.ADD}</Icon>}
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
