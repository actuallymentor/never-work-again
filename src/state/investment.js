import React from 'react'

// Import investment views
import { ParametersView, DesiresView, PlanningView, ExplainReasoningView, CompoundView } from '../stateless/investment-views'

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
			showOptions: false,
			compound: {
				capital: 1000,
				monthly: 500,
				timeline: 40,
				roi: 4
			}
		}
		// Bind the functions for use in the render
		this.setPersona = this.setPersona.bind( this )
		this.optionsToggle = this.optionsToggle.bind( this )
	}

	// Set the parameters
	setPersona( e ) {
		let newState = { 
			interest: this.state.interest,
			compound: this.state.compound
		}

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
				e.target.styles = 'width: ' + ( ( e.target.value.length * 8 ) + 15 ) + 'px;'
			break
			case 'timeline':
				newState.timeline = e.target.value
				e.target.styles = 'width: ' + ( ( e.target.value.length * 8 ) + 15 ) + 'px;'
			break
			case 'capital':
				newState.capital = Number( e.target.value )
				e.target.styles = 'width: ' + ( ( e.target.value.length * 8 ) + 15 ) + 'px;'
			break
			case 'capitalCompound':
				newState.compound.capital = Number( e.target.value )
			break
			case 'monthlyCompound':
				newState.compound.monthly = e.target.value
			break
			case 'timelineCompound':
				newState.compound.timeline = e.target.value
			break
			case 'roiCompound':
				newState.compound.roi = e.target.value
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
					handleChange  = { this.setPersona }
					interest 	  = { this.state.interest }
					income		  = { this.state.income }
					timeline 	  = { this.state.timeline }
					capital 	  = { this.state.capital } />
				<PlanningView
					handleChange  		= { this.setPersona }
					interest 	  		= { this.state.interest }
					desiredYearlyIncome = { this.state.income * 12 }
					capital 	  		= { this.state.capital }
					timeline 	  		= { this.state.timeline }
					showOptions   		= { this.state.showOptions }
					toggleOptions 		= { this.optionsToggle } />
				<DesiresView
					interest 	 = { this.state.interest }
					income		 = { this.state.income }
					timeline 	 = { this.state.timeline } />
				<CompoundView
					handleChange = { this.setPersona }
					capital  	 = { this.state.compound.capital }
					monthly  	 = { this.state.compound.monthly }
					timeline 	 = { this.state.compound.timeline }
					roi 	 	 = { this.state.compound.roi }
					/>
				<ExplainReasoningView />
			</div>
		)

	}
}