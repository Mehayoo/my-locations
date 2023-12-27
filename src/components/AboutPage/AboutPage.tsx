import { useNavigate } from 'react-router-dom'
import { Button, Icon } from 'react-materialize'
import { Icons } from '../../constants/icons'
import './style.scss'

const AboutPage = () => {
	const navigate = useNavigate()

	return (
		<div className="container">
			<div className="section">
				This is a demo app for WellDone Software. @Copyright Sorin-Ionut
				Mihaiu, 2022.
			</div>
			<div className="section">
				<Button
					icon={<Icon left>{Icons.ARROW_BACK}</Icon>}
					node="button"
					onClick={() => {
						navigate(`/`)
					}}
				>
					Go back to HomePage
				</Button>
			</div>
		</div>
	)
}

export default AboutPage
