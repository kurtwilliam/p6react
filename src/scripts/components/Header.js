import React from 'react';

export default class Header extends React.Component{
	constructor(){
		super();
		// this.state = {

		// }
	}
	// componentDidMount(){
	// 	this.points();
	// }
	render(){
		return(
			<div>
				<h1>Word Sammiches</h1>
				<nav>
					<button>settings</button>
					<div>
						<h3>Difficulty</h3>
						<label htmlFor="easy">Diet</label>
						<input type="radio" id="easy" name="difficulty"/>
						<label htmlFor="medium">Lunch time!</label>
						<input type="radio" id="medium" name="difficulty"/>
						<label htmlFor="hard">Meaty</label>
						<input type="radio" id="hard" name="difficulty"/>
					</div>
				</nav>
			</div>
		)
	}
}