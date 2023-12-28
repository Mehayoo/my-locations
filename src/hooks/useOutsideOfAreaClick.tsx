import { RefObject, useEffect } from 'react'
import { ActionCreatorWithoutPayload } from '@reduxjs/toolkit'
import { useAppDispatch } from '../redux/store'

export const useOutsideOfAreaClick = (
	ref: RefObject<HTMLElement>,
	dispatchAction: ActionCreatorWithoutPayload,
	paused: boolean
): void => {
	const dispatch = useAppDispatch()

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent): void => {
			if (paused || !ref.current) return

			if (!ref.current.contains(event.target as Node)) {
				dispatch(dispatchAction())
			}
		}
		document.addEventListener('mousedown', handleClickOutside)

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [dispatchAction, dispatch, ref, paused])
}
