import { isObject } from 'lodash'
import { literals } from '../constants'

const { general } = literals

export const nestedPropertyIsEmpty = (obj: Record<string, any>) => {
	let result = false

	const recurse = (searchObj: Record<string, any>) => {
		for (const key in searchObj) {
			if (searchObj[key] === '' || searchObj[key] === null) {
				M.toast({ html: general.fieldEmpty(key) })
				result = true

				break
			} else {
				if (isObject(searchObj[key])) {
					recurse(searchObj[key])
					if (result) {
						break
					}
				}
			}
		}
	}

	recurse(obj)

	return result
}
