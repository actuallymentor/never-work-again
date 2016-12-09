// Get polyfill so we can use full ES6 in the tests
import 'babel-polyfill'

// Import the compound functions
import { compound, reverseCompound } from '../src/modules/compound-investment.js'

// Expectation library
import { expect } from 'chai'

// Test the compound interest
describe( 'Compound interest function', f => {

	// Known query with an outcome
	let query = {
		initial: 0,
		yearlyAdd: 4242,
		roi: 4,
		term: 40,
		correct: '419222.17'
	}

	it( 'Is correct with initial none 1/2', done => {

		// Do a test calculation based on a known query
		let result = compound( query.initial, query.yearlyAdd, query.roi, query.term )
		expect( result.toFixed( 2 ) ).to.equal( query.correct )
		done( )

	} )

	// Do it again
	it( 'Is correct with initial none 2/2', done => {

		// Set new parameters
		query.yearlyAdd = 1951
		query.roi = 7
		query.term = 41
		query.correct = '448012.50'

		// Do a test calculation based on a known query
		let result = compound( query.initial, query.yearlyAdd, query.roi, query.term )
		expect( result.toFixed( 2 ) ).to.equal( query.correct )
		done( )

	} )

	// Do it again
	it( 'Is correct with high numbers', done => {

		// Set new parameters
		query.yearlyAdd = 42424242
		query.roi = 42
		query.term = 42
		query.correct = '357078280750970.00'

		// Do a test calculation based on a known query
		let result = compound( query.initial, query.yearlyAdd, query.roi, query.term )
		expect( result.toFixed( 2 ) ).to.equal( query.correct )
		done( )

	} )

	// With low numbers
	it( 'Is correct with low numbers', done => {

		// Set new parameters
		query.yearlyAdd = 5
		query.roi = 2
		query.term = 20
		query.correct = '123.92'

		// Do a test calculation based on a known query
		let result = compound( query.initial, query.yearlyAdd, query.roi, query.term )
		expect( result.toFixed( 2 ) ).to.equal( query.correct )
		done( )

	} )

	// With initial capital
	it( 'Is correct with initial capital 1/2', done => {

		// Set new parameters
		query.initial = 2111
		query.yearlyAdd = 3434
		query.roi = 4
		query.term = 40
		query.correct = '349505.28'

		// Do a test calculation based on a known query
		let result = compound( query.initial, query.yearlyAdd, query.roi, query.term )
		expect( result.toFixed( 2 ) ).to.equal( query.correct )
		done( )

	} )

	// With initial capital
	it( 'Is correct with initial capital 2/2', done => {

		// Set new parameters
		query.initial = 5
		query.yearlyAdd = 5
		query.roi = 2
		query.term = 20
		query.correct = '131.35'

		// Do a test calculation based on a known query
		let result = compound( query.initial, query.yearlyAdd, query.roi, query.term )
		expect( result.toFixed( 2 ) ).to.equal( query.correct )
		done( )

	} )


} )

describe( 'Reverse compound function', f => {
	// Known query with an outcome
	// End capital = income / roi%
	let query = {
		// Input parameters
		initial: 12456,
		term: 40,
		yearlyInput: 2134,
		roi: 4,
		monthlyInput: function( ) { return ( this.yearlyInput / 12 ).toFixed( 2 ) },
		// Desires
		endCapital: 271586.78,
		desiredYearly: function( ) { return this.endCapital * ( this.roi / 100 ) },
		desiredIncome: function( ) { return ( this.desiredYearly( ) / 12 ) }
	}

	it( 'Is correct with initial set 1/2', done => {
		// Do a test calculation based on a known query
		let result = reverseCompound( query.initial, query.desiredYearly( ), query.term, query.roi )

		// Set the assertion to be between a range
		let monthly = Number( query.monthlyInput( ) )
		expect( result.toFixed( 2 ) ).to.be.within( monthly - 20, monthly + 20 )
		done( )

	} )

	it( 'Is correct with initial set 2/2', done => {

		// Set new parameters
		query.initial = 88990
		query.term = 51
		query.yearlyInput = 6543
		query.roi = 6
		query.endCapital = 3878964.45

		// Do a test calculation based on a known query
		let result = reverseCompound( query.initial, query.desiredYearly( ), query.term, query.roi )

		// Set the assertion to be between a range
		let monthly = Number( query.monthlyInput( ) )
		expect( result.toFixed( 2 ) ).to.be.within( monthly - 20, monthly + 20 )
		done( )

	} )

	it( 'Is correct with high numbers', done => {

		// Set new parameters
		query.initial = 998877
		query.term = 45
		query.yearlyInput = 200000
		query.roi = 4
		query.endCapital = 31008729.58

		// Do a test calculation based on a known query
		let result = reverseCompound( query.initial, query.desiredYearly( ), query.term, query.roi )

		// Set the assertion to be between a range
		let monthly = Number( query.monthlyInput( ) )
		expect( result.toFixed( 2 ) ).to.be.within( monthly - 1, monthly + 1 )
		done( )

	} )

	it( 'Is correct with low numbers', done => {

		// Set new parameters
		query.initial = 2
		query.term = 1
		query.yearlyInput = 1
		query.roi = 1
		query.endCapital = 2.02

		// Do a test calculation based on a known query
		let result = reverseCompound( query.initial, query.desiredYearly( ), query.term, query.roi )

		// Set the assertion to be between a range
		let monthly = Number( query.monthlyInput( ) )
		expect( result.toFixed( 2 ) ).to.be.within( monthly - 1, monthly + 1 )
		done( )

	} )

} )