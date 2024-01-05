import React from 'react'
import { IBaseItem } from '../../entityTypes'
import { IListItemProps } from './types'

import './style.scss'

const ListItem = <T extends IBaseItem>({
	children,
	item,
	onItemClick,
	selectedItem,
}: IListItemProps<T>) => {
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
