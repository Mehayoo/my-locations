import { useState } from 'react'
import { Button, Icon } from 'react-materialize'
import { Icons, literals } from '../../constants'
import { IBaseItem } from '../../entityTypes'
import { IToolbarProps } from './types'

import './style.scss'

const Toolbar = <T extends IBaseItem>({
	addTooltipMsg,
	children,
	deleteFunction,
	deleteTooltipMsg,
	selectedItem,
	setIsModalOpen,
}: IToolbarProps<T>) => {
	const {
		categoriesPage: {
			toolbar: { tooltips },
		},
	} = literals

	const [isViewMode, setIsViewMode] = useState<boolean>(false)
	const [isEditMode, setIsEditMode] = useState<boolean>(false)

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

				{selectedItem && selectedItem.name && (
					<>
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
							tooltip={tooltips.viewTooltipMsg}
							waves="light"
						/>

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
					</>
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
