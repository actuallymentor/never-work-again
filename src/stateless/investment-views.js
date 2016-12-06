// Import react
import React from 'react'

export const ParametersView = ( { handleChange, interest }  ) => {
	return (
			<div>
				<p> You are assuming
				pessimistic, historical and optimistic
				returns of {interest.pessimistic}%, {interest.historical}% and {interest.optimistic}%
				on a yearly basis</p>
				<span id="assumptions">
					<input
						onChange = { handleChange }
						value	 = { interest.pessimistic || '' }
						id="pessimistic" type="number" name="pessimistic" />
					<input
						onChange = { handleChange }
						value	 = { interest.historical || '' }
						id="historical" type="number" name="historical" />
					<input
						onChange = { handleChange }
						value 	 = { interest.optimistic || '' }
						id="optimistic" type="number" name="optimistic" />
				</span>
			</div>
		)
}

export const DesiresView = (  ) => {
	return ( <p>No desire view yet</p> )
}