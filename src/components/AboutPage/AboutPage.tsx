import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Icon } from 'react-materialize'
import { Icons, literals } from '../../constants'

import './style.scss'

const AboutPage = () => {
	const { aboutPage } = literals
	const navigate = useNavigate()

	return (
		<div className="container">
			<div className="section">{aboutPage.content}</div>
			<div className="section">
				<Button
					icon={<Icon left>{Icons.ARROW_BACK}</Icon>}
					node="button"
					onClick={() => {
						navigate(`/`)
					}}
				>
					{aboutPage.buttons.back}
				</Button>
			</div>
		</div>
	)
}

export default AboutPage
