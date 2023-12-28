import { ILocation } from './ILocation'

export interface ICategory {
	id: string
	name: string
	locations: ILocation[]
}
