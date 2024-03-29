import { findExisting } from './findExisting'
import { literals } from '../constants'

const { general } = literals

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nestedPropertyExists = (obj: Record<string, any>, arr: any[]) => {
	let result = false

	Object.keys(obj).forEach((key) => {
		if (findExisting(arr, key, obj[key])) {
			M.toast({ html: general.fieldExists(key) })
			result = true
		}
	})

	return result
}
