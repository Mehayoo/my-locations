import { ReactElement } from 'react'
import { ICategory, ILocation } from '../../entityTypes'

import './style.scss'

interface IListItemProps {
	children?: (data: any) => ReactElement
	item: ICategory | ILocation
	onItemClick: (arg: any) => void
	selectedItem: ICategory | ILocation
}

const ListItem = ({
	children,
	item,
	onItemClick,
	selectedItem,
}: IListItemProps) => {
	return (
		<li
			className={`collection-item category-list-item ${
				selectedItem && item.id === selectedItem.id && 'active'
			}`}
			onClick={() => {
				onItemClick(item)
			}}
		>
			{item.name}

			{children && children(item)}
		</li>
	)
}

export default ListItem
