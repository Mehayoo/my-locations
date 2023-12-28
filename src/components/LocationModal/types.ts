import { ILocation } from '../../entityTypes'

export interface ILocationModalProps {
	readonly isEditMode: boolean
	readonly isOpen: boolean
	readonly isViewMode: boolean
	readonly selectedLocation: ILocation
	readonly setIsEditMode: (arg: boolean) => void
	readonly setIsOpen: (arg: boolean) => void
	readonly setIsViewMode: (arg: boolean) => void
}
