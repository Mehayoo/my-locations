import { ReactElement } from 'react'

export interface IToolbarProps<T> {
	readonly addTooltipMsg: string
	readonly children?: (data?: any) => ReactElement
	readonly deleteFunction: () => void
	readonly deleteTooltipMsg: string
	readonly selectedItem: T
	readonly setIsModalOpen: (arg: boolean) => void
}
