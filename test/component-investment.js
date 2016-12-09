// Get polyfill so we can use full ES6 in the tests
import 'babel-polyfill'
// Create a mock DOM
import 'jsdom-global/register'

import React from 'react'
import { expect } from 'chai'
import { mount } from 'enzyme'

// Investment planner
import Investment from '../src/state/investment'

// Mount the conponent globally
const investment = mount( <Investment /> )

// Mount the state globally
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

describe( '<Investment /> state changes', f => {


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
	it( 'Sets the retirement timeline to state', done => {

		let timelineInput = investment.find( '#aboutuser input[name="timeline"]' )



		done( )

	} )

	// Check income desire input to state
	it( 'Sets the desired monthly income to state', done => {

		let incomeinput = investment.find( '#aboutuser input[name="income"]' )

		

		done( )

	} )

	// Set starting capital input to state
	it( 'Sets the starting capital to state', done => {

		let capitalinput = investment.find( '#aboutuser input[name="capital"]' )

		

		done( )

	} )

} )

describe( '<Investment /> calculation correctness', f =>{

	let query = defaultState
	query.correct = {
		pessimistic: '€933.17',
		historical: '€290.75',
		optimistic: '€51.29'
	}
	



	it( 'Responds correctly to the default parameters', done => {

		let pessimisticInput = investment.find( '#pessimisticMonthly' )
		let reasonableInput = investment.find( '#realisticMonthly' )
		let optimisticInput = investment.find( '#optimisticMonthly' )

		expect( pessimisticInput.text( ) ).to.equal( query.correct.pessimistic )

		done( )

	} ) 

} )