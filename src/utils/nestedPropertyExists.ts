import { findExisting } from './findExisting'
import { literals } from '../constants'

const { general } = literals

export const nestedPropertyExists = (obj: any, arr: any) => {
	let result = false

	Object.keys(obj).forEach((key) => {
		if (findExisting(arr, key, obj[key])) {
			M.toast({ html: general.fieldExists(key) })
			result = true
		}
	})

	return result
}
