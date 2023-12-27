import { RefObject, useEffect } from 'react'
import { useAppDispatch } from '../store/store'

export const useOutsideOfAreaClick = (
	ref: RefObject<any>,
	actionFunc: () => void
): void => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (ref.current && !ref.current.contains(event.target)) {
				dispatch(actionFunc())
			}
		}
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [actionFunc, dispatch, ref])
}
