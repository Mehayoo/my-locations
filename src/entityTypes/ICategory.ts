export interface ICategory {
	id: string
	name: string
}

export type ICategoryDraft = Omit<ICategory, 'id'>
