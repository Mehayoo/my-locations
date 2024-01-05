import React from 'react'
import { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'
import {
	AboutPage,
	CategoriesPage,
	LocationsPage,
	Navbar,
} from '../src/components/index'

import 'materialize-css/dist/css/materialize.min.css'
import M from 'materialize-css'
import './App.scss'

const App = () => {
	useEffect(() => {
		//Initialize materialize JS
		M.AutoInit()
	})

	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<Routes>
					<Route path="/" element={<CategoriesPage />} />
					<Route
						path="/:categoryName/locations"
						element={<LocationsPage />}
					/>
					<Route path="/about" element={<AboutPage />} />
				</Routes>
			</Router>
		</Provider>
	)
}

export default App
