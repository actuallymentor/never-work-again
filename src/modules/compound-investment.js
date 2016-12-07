export const compound = ( initial, yearly, roi, term, verbose = true ) => {

	// Set the initial value
	let result = initial
	let totalinvested = initial

	// Do interest and yearly add for every year
	for (var i = term - 1; i >= 0; i--) {
		result += yearly
		result *= ( 1 + ( roi /100 ) )
		// We assume the yearly investment is done at the END of the year
		totalinvested += yearly
	}

	// Log data to console
	if ( verbose ) console.log( 'Result: ' + result + '\nTotal invested: ' + totalinvested )
	if ( verbose ) console.log( 'Assuming ' + yearly + ' yearly investment at ' + roi + '% for ' + term + ' years with a starting capital of ' + initial )

	// Return the result for use in other functions
	return result

}

export const reverseCompound = ( initial, desiredIncome, term, roi, verbose = false ) => {

	// Calculate needed capital from desired income
	let desire = desiredIncome / ( roi / 100 )

	// How accurate should we guess? 1 means to the euro
	let step = 1

	// Set our goal to be €1 more than required
	let goal = desire + 1

	// Set the initial monthly amount to what 0% interest would require
	let yearly = ( desire / term )

	// Brute force the yearly investment by lowering the investment until the goal would be lower that the desire at this investment height
	while ( goal > desire ) {
		goal = compound( initial, yearly, roi, term, verbose )
		yearly -= step
	}

	console.log( 'Yearly needed: ' + yearly )
	console.log( 'Monthly needed: ' + ( yearly / 12 ) )

	return ( yearly / 12 )

}