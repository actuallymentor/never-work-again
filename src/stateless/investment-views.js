// Import react
import React from 'react'

// Import the financial planner
import { compound, reverseCompound } from '../modules/compound-investment'

const money = ( number ) => {
	return Number( number ).toLocaleString('en-US', { style: 'currency', currency: 'EUR' })
}

console.log( money( 22.66666 ) )
console.log( money( '22.55555' ) )


export const ParametersView = ( { handleChange, interest, income, timeline }  ) => {
	return (
			<div>
				<h2>Tell me about you.</h2>
				<p id="aboutuser">
					When I retire in
					<input
						onChange = { handleChange }
						value 	 = { timeline || '' }
						type 	 = "number"
						name	 = "timeline"
					/>
					years I would like a monthly income of
					<input
						onChange = { handleChange }
						value 	 = { income || '' }
						type 	 = "number"
						name	 = "income"
					/>
					.
				</p>
			</div>
		)
}

export const DesiresView = ( { interest, income, timeline } ) => {
	return (
			<div>
				<h2>Why this is the case</h2>
				<p>In the event that stocks return a { interest.pessimistic }% interest amount you would need { money( income * 12 / ( interest.pessimistic / 100 ) ) }, since { interest.pessimistic }% of that amount generates { money( income * 12 ) } a year, which is €{ income } a month.</p>
				<p>In the event that stocks return a { interest.historical }% interest amount you would need { money( ( income * 12 ) / ( interest.historical / 100 ) ) }, since { interest.historical }% of that amount generates { money( income * 12 ) } a year, which is €{ income } a month.</p>
				<p>In the event that stocks return a { interest.optimistic }% interest amount you would need { money( ( income * 12 ) / ( interest.optimistic / 100 ) ) }, since { interest.historical }% of that amount generates { money( income * 12 ) } a year, which is { money( income ) } a month.</p>
				<p>You are assuming
				pessimistic, historical and optimistic
				returns of {interest.pessimistic}%, {interest.historical}% and {interest.optimistic}%
				on a yearly basis.</p>
			</div>
		)
}

export const PlanningView = ( { handleChange, interest, desiredIncome, capital, timeline, showOptions, toggleOptions } ) => {
	let monthlies = {
		pessimistic: reverseCompound(
						capital,
						desiredIncome,
						timeline,
						interest.pessimistic
					).toFixed( 2 ),
		historical: reverseCompound(
							capital,
							desiredIncome,
							timeline,
							interest.historical
						).toFixed( 2 ),
		optimistic: reverseCompound(
							capital,
							desiredIncome,
							timeline,
							interest.optimistic
						).toFixed( 2 )
	}
	return(
			<div>
				<h2>Let's plan ahead together.</h2>
				<p>You want a monthly income of €{ desiredIncome / 12 },- when you retire { timeline } years from now.</p>
				<p>In order to have €{ desiredIncome / 12 } to spend per month you will need an amount of money that will generate an amount of interest equal to that amount of income.</p>
				<p>The amounts below reflect how much you need to invest per month to reach your goal.</p>
				<table>
					<thead>
						<tr>
							<th>Market</th>
							<th>Returns</th>
							<th>Monthly investments</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Pessimistic</td>
							<td>{ interest.pessimistic }%</td>
							<td>{ money( monthlies.pessimistic ) }</td>
						</tr>
						<tr>
							<td>Reasonable</td>
							<td>{ interest.historical }%</td>
							<td>{ money( monthlies.historical ) }</td>
						</tr>
						<tr>
							<td>Optimistic</td>
							<td>{ interest.optimistic }%</td>
							<td>{ money( monthlies.optimistic ) }</td>
						</tr>
					</tbody>
				</table>
				<div className="option" onClick={toggleOptions}>
					{ showOptions ? 'Hide options' : 'Set your own return percentages' }
				</div>
				<div className={ showOptions ? '' : 'hide' } >
					<p>What percentages of returns do you want to calculate with?</p>
					<span id="assumptions">
						<p>Pessimistically:</p>
						<input
							onChange = { handleChange }
							value	 = { interest.pessimistic || '' }
							type 	 = "number"
							name 	 = "pessimistic" />
						<p>Reasonably</p>
						<input
							onChange = { handleChange }
							value	 = { interest.historical || '' }
							type 	 = "number"
							name	 = "historical" />
						<p>Optimistically:</p>
						<input
							onChange = { handleChange }
							value 	 = { interest.optimistic || '' }
							type 	 = "number"
							name 	 = "optimistic" />
					</span>
				</div>
			</div>
		)
}

export const ExplainReasoningView = (  ) => {
	return(
		<div>
			<h2>My reasoning for this calculation</h2>
			<p>
				Step one is understanding compound interest. Basically this means that the longer invest, the faster you gain money. Basically it's the reason people say "the rich get richer". <a href="https://www.skillcollector.com/manage-finances-investments/#Understand_the_magic_of_compound_interest">Read more about compound interest.</a>
			</p>
			<p>
				The reason I assume 2%, 4% and 8% of stock returns is based on index fund investing (<a href="https://www.skillcollector.com/manage-finances-investments/#Index_funds">read more about index funds</a>). Historically the average return of a big index fund called the S&P 500 is about 10% (<a href="http://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/histretSP.html">see this data sheet</a>). This is not yet adjusted for inflation etc, so it may seem a bit high. Predicting future returns is always guessing, I tried to be as reasonable as I could.
			</p>
			<p>There are a number of important things you need to know about this calculation, it:</p>
			<ul>
				<li>Adds your investments once a year (so not monthly)</li>
				<li>Calculates interest once a year</li>
				<li>Adds your yearly investment before calculating interest</li>
			</ul>
			<h2>Disclaimer</h2>
			<p>This is a tool made by an investing enthusiast for personal use. This is not financial advice. Investing is risky, talk to a financial advisor and do your own research before making investment decisions.</p>
			<p>This tool comes with no warranty or guarantees whatsowever. There is a legitimate chance I made a mistake or miscalculation that makes this tool useless. I suggest checking your math before making investment decisions.</p>
		</div>
	)
}