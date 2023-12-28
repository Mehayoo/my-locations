import { ListItem } from '../index'
import { IBaseItem } from '../../entityTypes'
import { IListProps } from './types'

const List = <T extends IBaseItem>({
	children,
	emptyMsg,
	listItems,
	onItemClick,
	selectedItem,
}: IListProps<T>) => {
	return (
		<ul className="collection">
			{listItems.length > 0 ? (
				listItems.map((item) => (
					<ListItem
						item={item}
						key={item.id}
						onItemClick={onItemClick}
						selectedItem={selectedItem}
					>
						{children}
					</ListItem>
				))
			) : (
				<li className="collection-item">{emptyMsg}</li>
			)}
		</ul>
	)
}

export default List
