import React from 'react'
import { Link } from 'react-router-dom'
import { literals } from '../../constants'

import './style.scss'

const Navbar = () => {
	const { navigation, title } = literals

	return (
		<nav className="purple darken-1">
			<div className="container nav-wrapper">
				<div className="brand-logo">{title}</div>
				<ul id="nav-mobile" className="right nav-links">
					<Link to="/">{navigation.homeTab}</Link>
					<Link to="/about">{navigation.aboutTab}</Link>
				</ul>
			</div>
		</nav>
	)
}
export default Navbar
