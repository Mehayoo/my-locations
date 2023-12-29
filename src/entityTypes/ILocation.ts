export interface ILocation {
	id: string
	name: string
	address: string
	coordinates: {
		lat: number | null
		lng: number | null
	}
	categoryId: string
}

export type ILocationDraft = Omit<ILocation, 'id'>
