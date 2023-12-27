import { Button, Icon } from 'react-materialize'
import { Icons } from '../../constants/icons'

interface IEditBtnProps {
	editMode: 'inline' | 'popup'
	editingState: boolean
	onClick: () => void
	tooltipMsg?: string
}

const EditBtn = ({
	editMode,
	editingState,
	onClick,
	tooltipMsg,
}: IEditBtnProps) => {
	const RenderIcon = () => {
		switch (editMode) {
			case 'inline':
				return editingState ? (
					<Icon>{Icons.CLOSE}</Icon>
				) : (
					<Icon>{Icons.CREATE}</Icon>
				)
			case 'popup':
				return <Icon>{Icons.CREATE}</Icon>
		}
	}

	return (
		<Button
			className="blue"
			floating
			icon={<RenderIcon />}
			node="button"
			onClick={onClick}
			small
			style={{ marginLeft: '1rem' }}
			tooltip={tooltipMsg}
			waves="light"
		/>
	)
}

export default EditBtn
