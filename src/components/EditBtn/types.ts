export interface IEditBtnProps {
	readonly editMode: 'inline' | 'popup'
	readonly editingState: boolean
	readonly onClick: () => void
	readonly tooltipMsg?: string
}
