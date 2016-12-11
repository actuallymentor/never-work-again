console.log('Main js loaded')
import React from 'react'
import ReactDOM from 'react-dom'

// Visual elements
import { Panel, Header } from './state/head'
import { Main, Section } from './state/body'
import Footer from './stateless/footer-views'

// Css
import './styles/styles.scss'

// Placeholder text
import Lorem from './stateless/lorem-ipsum-view'

// Investment planner
import Investment from './state/investment'

class App extends React.Component {

	// Constructor setting default state
	constructor ( props ) {
		super ( props )
		// Set the state objects
		this.state = {
			show: 'welcome'
		}
	}

	// Render the main application element
	render( ) {
		return (
			<div className = "flexify">
				<header>
					<Panel id= "menu" />
					<Header
						id 		 = "header"
						title 	 = "Never Work Again"
						subtitle = "Plan retirement based on compound interest investments"
						name	 = "Never Work Again"
						logo	 = ""
					/>
				</header>
				<Main>
					<Section content = { <Investment /> } />
				</Main>
				<Footer
					owner = "Mentor Palokaj"
				 />
			</div>
		)
	}
}


ReactDOM.render( <App />, document.getElementById('container') )