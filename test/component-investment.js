// Get polyfill so we can use full ES6 in the tests
import 'babel-polyfill'
// Create a mock DOM
import 'jsdom-global/register'

import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

// Investment planner
import Investment from '../src/state/investment'

const stringMoney = currency => {
	return String( currency.replace(/[^0-9\.]+/g,"") )
}


describe( '<Investment /> state changes and rendering of inputs', f => {

	// Mount the conponent for test block
	const investment = mount( <Investment /> )

	// Mount the state
	let defaultState = {
		interest: {
			pessimistic: 2,
			historical:  4,
			optimistic:  8
		},
		income: 1150,
		capital: 0,
		timeline: 40,
		showOptions: false
	}


	it( 'Sets the state defaults', done => {

		// One by one check, bit bloated bit it will error fr specific things
		expect( investment.state( ).interest.pessimistic ).to.equal( defaultState.interest.pessimistic )
		expect( investment.state( ).interest.historical ).to.equal( defaultState.interest.historical )
		expect( investment.state( ).interest.optimistic ).to.equal( defaultState.interest.optimistic )
		expect( investment.state( ).income ).to.equal( defaultState.income )
		expect( investment.state( ).capital ).to.equal( defaultState.capital )
		expect( investment.state( ).timeline ).to.equal( defaultState.timeline )
		expect( investment.state( ).showOptions ).to.equal( defaultState.showOptions )

		done( )
	} )


	// Check timeline input to state
	it( 'Sets the retirement timeline based on state', done => {

		let timelineInput = investment.find( '#aboutuser input[name="timeline"]' )

		//Check if timeline input is reflected in state
		expect( timelineInput.props( ).value ).to.equal( investment.state( ).timeline )
		investment.setState( { timeline: 60 } )
		expect( timelineInput.props( ).value ).to.equal( investment.state( ).timeline )
		done( )

	} )

	// Check income desire input to state
	it( 'Sets the desired monthly income based on state', done => {

		let incomeInput = investment.find( '#aboutuser input[name="income"]' )

		//Check if income change is reflected in state
		expect( incomeInput.props( ).value ).to.equal( investment.state( ).income )
		investment.setState( { income: 6000 } )
		expect( incomeInput.props( ).value ).to.equal( investment.state( ).income )
		done( )

	} )

	// Set starting capital input to state
	it( 'Sets the starting capital based on state', done => {

		let capitalinput = investment.find( '#aboutuser input[name="capital"]' )

		//Check if capital change is reflected in state
		expect( capitalinput.props( ).value ).to.equal( investment.state( ).capital )
		investment.setState( { capital: 5000 } )
		expect( capitalinput.props( ).value ).to.equal( investment.state( ).capital )

		done( )

	} )

} )

describe( '<Investment /> calculation correctness', f =>{

	// Mount the conponent for test block
	const investment = mount( <Investment /> )

	// Mount the state
	let defaultCorrect = {
		pessimistic: '933.17',
		historical: '290.75',
		optimistic: '51.29'
	}
	
	// Check the default response to be correct
	it( 'Responds correctly to the default parameters', done => {

		let pessimisticInput = investment.find( '#pessimisticMonthly' )
		let reasonableInput = investment.find( '#realisticMonthly' )
		let optimisticInput = investment.find( '#optimisticMonthly' )

		// using .contains instead of .equal because of € sign which js might change per locale
		expect( pessimisticInput.text( ) ).contains( defaultCorrect.pessimistic )
		expect( reasonableInput.text( ) ).contains( defaultCorrect.historical )
		expect( optimisticInput.text( ) ).contains( defaultCorrect.optimistic )

		done( )

	} )

	it( 'Responds correctly when the parameters change (no capital)', done => {

		let scenario = {
			// Input parameters
			initial: 0,
			term: 52,
			yearlyInput: 5411,
			roi: 3,
			monthlyInput: function( ) { return ( this.yearlyInput / 12 ).toFixed( 2 ) },
			// Desires
			endCapital: 678253.06,
			desiredYearly: function( ) { return this.endCapital * ( this.roi / 100 ) },
			desiredIncome: function( ) { return ( this.desiredYearly( ) / 12 ) }
		}

		// Change parameters and check outcome
		let newState = investment.state( )
		newState.income = scenario.desiredIncome( )
		newState.capital = scenario.initial
		newState.timeline = scenario.term
		newState.interest.pessimistic = scenario.roi
		newState.interest.historical = scenario.roi
		newState.interest.optimistic = scenario.roi
		investment.setState( newState )

		let pessimisticResult = stringMoney( investment.find( '#pessimisticMonthly' ).text( ) )
		let historicalResult = stringMoney( investment.find( '#realisticMonthly' ).text( ) )
		let optimisticResult = stringMoney( investment.find( '#optimisticMonthly' ).text( ) )

		// Check if the new results are within +- one of the theoretical amount
		expect( pessimisticResult ).to.be.within( scenario.monthlyInput( ) - 1, scenario.monthlyInput( ) + 1 )
		expect( historicalResult ).to.be.within( scenario.monthlyInput( ) - 1, scenario.monthlyInput( ) + 1 )
		expect( optimisticResult ).to.be.within( scenario.monthlyInput( ) - 1, scenario.monthlyInput( ) + 1 )

		done( )

	} )

	it( 'Responds correctly when the parameters change (with capital)', done => {

		let scenario = {
			// Input parameters
			initial: 34189,
			term: 49,
			yearlyInput: 6735,
			roi: 4,
			monthlyInput: function( ) { return ( this.yearlyInput / 12 ).toFixed( 2 ) },
			// Desires
			endCapital: 1255103.19,
			desiredYearly: function( ) { return this.endCapital * ( this.roi / 100 ) },
			desiredIncome: function( ) { return ( this.desiredYearly( ) / 12 ) }
		}

		// Change parameters and check outcome
		let newState = investment.state( )
		newState.income = scenario.desiredIncome( )
		newState.capital = scenario.initial
		newState.timeline = scenario.term
		newState.interest.pessimistic = scenario.roi
		newState.interest.historical = scenario.roi
		newState.interest.optimistic = scenario.roi
		investment.setState( newState )

		let pessimisticResult = stringMoney( investment.find( '#pessimisticMonthly' ).text( ) )
		let historicalResult = stringMoney( investment.find( '#realisticMonthly' ).text( ) )
		let optimisticResult = stringMoney( investment.find( '#optimisticMonthly' ).text( ) )

		// Check if the new results are within +- one of the theoretical amount
		expect( pessimisticResult ).to.be.within( scenario.monthlyInput( ) - 1, scenario.monthlyInput( ) + 1 )
		expect( historicalResult ).to.be.within( scenario.monthlyInput( ) - 1, scenario.monthlyInput( ) + 1 )
		expect( optimisticResult ).to.be.within( scenario.monthlyInput( ) - 1, scenario.monthlyInput( ) + 1 )

		done( )


	} )

} )

describe( '<CompoundView /> calculates correctly', f => {

	// Mount the conponent for test block
	const investment = mount( <Investment /> )

	// Known query with an outcome
	let query = {
		compound: {
			capital: 0,
			monthly: 353.5,
			roi: 4,
			timeline: 40
		},
		correct: '419,222.17'
	}

	it( 'Is correct with initial none', done => {

		investment.setState( {
			compound: query.compound
		} )

		// Do a test calculation based on a known query
		let result = investment.find( '#compoundResult' ).text( )
		expect( result ).to.contain( query.correct )
		done( )

	} )

	it( 'Is correct with initial capital', done => {

		// Set known correct parameters
		query.compound.capital = 2111
		query.compound.monthly = 286.166666666666667
		query.compound.roi = 4
		query.compound.timeline = 40
		query.correct = '349,505.28'

		investment.setState( {
			compound: query.compound
		} )

		// Do a test calculation based on a known query
		let result = investment.find( '#compoundResult' ).text( )
		expect( result ).to.contain( query.correct )
		done( )

	} )


} )