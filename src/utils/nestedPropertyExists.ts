import { findExisting } from './findExisting'

export const nestedPropertyExists = (obj: any, arr: any) => {
	let result = false

	Object.keys(obj).forEach((key) => {
		if (findExisting(arr, key, obj[key])) {
			M.toast({ html: `${key} field already exists` })
			result = true
		}
	})

	return result
}
