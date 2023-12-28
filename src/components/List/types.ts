import { ReactElement } from 'react'

export interface IListProps<T> {
	readonly children?: (data: T) => ReactElement
	readonly emptyMsg: string
	readonly listItems: T[]
	readonly onItemClick: (arg: T) => void
	readonly selectedItem: T
}
