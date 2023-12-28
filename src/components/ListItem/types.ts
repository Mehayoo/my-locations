import { ReactElement } from 'react'

export interface IListItemProps<T> {
	readonly children?: (data: T) => ReactElement
	readonly item: T
	readonly onItemClick: (arg: T) => void
	readonly selectedItem: T
}
