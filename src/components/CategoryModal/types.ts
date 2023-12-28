import { ICategory } from '../../entityTypes'

export interface IAddCategoryModalProps {
	readonly isOpen: boolean
	readonly isViewMode: boolean
	readonly selectedCategory: ICategory
	readonly setIsOpen: (arg: boolean) => void
	readonly setIsViewMode: (arg: boolean) => void
}
