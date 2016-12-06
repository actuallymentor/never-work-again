import React from 'react'

// Import investment views
import { ParametersView, DesiresView } from '../stateless/investment-views'

// Setting the parameters of the market
export class Parameters extends React.Component {
	// Constructor setting default state
	constructor ( props ) {
		super ( props )
		// Set the state objects
		this.state = {
			interest: {
				pessimistic: this.props.pessimistic || 1,
				historical:  this.props.historical  || 4,
				optimistic:  this.props.optimistic  || 7
			}
		}
		// Bind the functions for use in the render
		this.setInterest = this.setInterest.bind( this )
	}

	// Set the parameters
	setInterest( e ) {
		let newInterest = { interest: this.state.interest }

		// Change the state interest key based on changed input
		switch( e.target.name ) {
			case 'pessimistic':
				newInterest.interest.pessimistic = e.target.value
			break
			case 'historical':
				newInterest.interest.historical  = e.target.value
			break
			case 'optimistic':
				newInterest.interest.optimistic  = e.target.value
			break
		}
		this.setState( newInterest )
	}

	// Rendering of message
	render( ) {
		return(
			<div>
				<ParametersView
					handleChange = { this.setInterest }
					interest 	 = { this.state.interest } />
				<DesiresView />
			</div>
		)

	}
}

// Results

export class Projections extends React.Component {
	render( ) {
		return( 'No projections yet' )
	}
}