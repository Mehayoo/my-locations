import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { rootReducer } from '../reducers'

function saveToLocalStorage(state: RootState): void {
	try {
		const serialisedState = JSON.stringify(state)
		localStorage.setItem('appData', serialisedState)
	} catch (e) {
		console.warn(e)
	}
}

function loadFromLocalStorage() {
	try {
		const serialisedState: string | null = localStorage.getItem('appData')
		if (serialisedState === null) return undefined
		return JSON.parse(serialisedState)
	} catch (e) {
		console.warn(e)
		return undefined
	}
}

const store = configureStore({
	reducer: rootReducer,
	preloadedState: loadFromLocalStorage(),
})

store.subscribe(() => saveToLocalStorage(store.getState()))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector // creating typed versions of useSelector

export default store
