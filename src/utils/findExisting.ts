import { find as loadashFind } from 'lodash'

export const findExisting = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	searchArr: any[],
	propName: string,
	propValue: string
) => {
	return loadashFind(searchArr, { [propName]: propValue })
}
