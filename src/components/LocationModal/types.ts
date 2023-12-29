import { ILocation } from '../../entityTypes'

export interface ILocationModalProps {
	readonly categoryLocations: ILocation[]
	readonly isEditMode: boolean
	readonly isOpen: boolean
	readonly isViewMode: boolean
	readonly setIsEditMode: (arg: boolean) => void
	readonly setIsOpen: (arg: boolean) => void
	readonly setIsViewMode: (arg: boolean) => void
}

export interface FormInputs {
	name: string
	address: string
	coordinates: {
		lat: number | null
		lng: number | null
	}
}
