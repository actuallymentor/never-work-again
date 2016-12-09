export const compound = ( initial, yearlyAdd, roi, term, verbose = false ) => {

	// Set the initial value
	let result = initial
	let totalinvested = initial

	// Do interest and yearly add for every year
	for (var i = term - 1; i >= 0; i--) {
		result += yearlyAdd
		result *= ( 1 + ( roi /100 ) )
		// We assume the yearly investment is done at the END of the year
		totalinvested += yearlyAdd
	}

	// Log data to console
	if ( verbose ) console.log( 'Result: ' + result + '\nTotal invested: ' + totalinvested )
	if ( verbose ) console.log( 'Assuming ' + yearlyAdd + ' yearly investment at ' + roi + '% for ' + term + ' years with a starting capital of ' + initial )

	// Return the result for use in other functions
	return result

}

export const reverseCompound = ( initial, desiredYearlyIncome, term, roi, verbose = false ) => {

	if( verbose ) console.log( initial, desiredYearlyIncome, term, roi, verbose )

	// Calculate needed capital from desired income ( YEARLY )
	let neededCapital = desiredYearlyIncome / ( roi / 100 )

	// How accurate should we guess? 1 means to the euro
	let step = 1

	// Set our goal to be €1 more than required
	let attemptResult = neededCapital + 1

	// Set the initial monthly amount to what 0% interest would require
	let yearlyAddTest = ( neededCapital / term )

	// Brute force the yearly investment by lowering the investment until the goal would be lower that the desire at this investment height
	while ( attemptResult > neededCapital ) {
		attemptResult = compound( initial, yearlyAddTest, roi, term )
		yearlyAddTest -= step
	}

	if ( verbose ) console.log( 'Yearly needed: ' + yearlyAddTest )
	if ( verbose ) console.log( 'Monthly needed: ' + ( yearlyAddTest / 12 ) )

	if ( yearlyAddTest < 0 ) return 0
	return ( yearlyAddTest / 12 )

}