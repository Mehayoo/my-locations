import { ICategory } from './ICategory'
import { ILocation } from './ILocation'

export interface ICategoriesState {
	categories: ICategory[]
	currentCategory: ICategory | null
	currentLocation: ILocation | null
}
