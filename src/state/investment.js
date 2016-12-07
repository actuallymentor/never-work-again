import React from 'react'

// Import investment views
import { ParametersView, DesiresView, PlanningView, ExplainReasoningView } from '../stateless/investment-views'

// Setting the parameters of the market
export default class Investment extends React.Component {
	// Constructor setting default state
	constructor ( props ) {
		super ( props )
		// Set the state objects
		this.state = {
			interest: {
				pessimistic: this.props.pessimistic || 2,
				historical:  this.props.historical  || 4,
				optimistic:  this.props.optimistic  || 8
			},
			income: 1150,
			capital: 0,
			timeline: 40,
			showOptions: false
		}
		// Bind the functions for use in the render
		this.setInterest = this.setInterest.bind( this )
		this.optionsToggle = this.optionsToggle.bind( this )
	}

	// Set the parameters
	setInterest( e ) {
		let newState = { interest: this.state.interest }

		// Change the state interest key based on changed input
		switch( e.target.name ) {
			case 'pessimistic':
				newState.interest.pessimistic = e.target.value
			break
			case 'historical':
				newState.interest.historical  = e.target.value
			break
			case 'optimistic':
				newState.interest.optimistic  = e.target.value
			break
			case 'income':
				newState.income = e.target.value
			break
			case 'timeline':
				newState.timeline = e.target.value
			break
		}
		this.setState( newState )
	}

	// Show the options bar
	optionsToggle( ) {
		this.setState( { showOptions: this.state.showOptions ? false : true } )
	}

	// Rendering of message
	render( ) {

		// Show the app result
		return(
			<div>
				<p className="note">If you are just getting started with budgeting & investing <a href="https://www.skillcollector.com/manage-finances-investments/">read this</a>.</p>
				<ParametersView
					handleChange  = { this.setInterest }
					interest 	  = { this.state.interest }
					income		  = { this.state.income }
					timeline 	  = { this.state.timeline } />
				<PlanningView
					handleChange  = { this.setInterest }
					interest 	  = { this.state.interest }
					desiredIncome = { this.state.income * 12 }
					capital 	  = { this.state.capital }
					timeline 	  = { this.state.timeline }
					showOptions   = { this.state.showOptions }
					toggleOptions = { this.optionsToggle } />
				<DesiresView
					interest 	 = { this.state.interest }
					income		 = { this.state.income }
					timeline 	 = { this.state.timeline } />
				<ExplainReasoningView />
			</div>
		)

	}
}