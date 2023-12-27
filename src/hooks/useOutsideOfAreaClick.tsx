import { RefObject, useEffect } from 'react'
import { useAppDispatch } from '../store/store'

export const useOutsideOfAreaClick = (
	ref: RefObject<any>,
	actionFunc: () => void,
	paused: boolean
): void => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (paused) return

			if (ref.current && !ref.current.contains(event.target)) {
				dispatch(actionFunc())
			}
		}
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [actionFunc, dispatch, ref, paused])
}
