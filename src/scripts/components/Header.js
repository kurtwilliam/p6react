import React from 'react';

export default class Header extends React.Component{
	constructor(){
		super();
		// this.state = {
		// 	wordLength: ''
		// }
		// this.wordLength = this.wordLength.bind(this);
		// this.headerChange = this.headerChange.bind(this);
	}
	componentDidMount(){
		// this.wordLength();
	}
	// wordLength(){
	// 	// let length = document.querySelector('input[name = "length"]:checked').value;
	// 	this.setState({
	// 		wordLength: length
	// 	})
	// }
	headerChange(e){
		this.setState({
			wordLength: e.target.value,
		})
		console.log(this.state.wordLength)
	}
	render(){
		return(
			<header>
				<h1>Word Sandwiches</h1>
			</header>
		)
	}
}

				// <nav>
				// 	<button>Settings</button>
				// 	<div>
				// 		<h3>Difficulty</h3>
				// 		<div>
				// 			<h4>Size of Sandwich (word length)</h4>
				// 			<label htmlFor="easy">Lean Cuisine</label>
				// 			<input type="radio" id="easy" name="length" onChange={this.headerChange} value=">2,<7" />
				// 			<label htmlFor="medium">Normal</label>
				// 			<input type="radio" id="medium" name="length" value=">3,<8" onChange={this.headerChange} />
				// 			<label htmlFor="hard">Extra Protein</label>
				// 			<input type="radio" id="hard" name="length" value=">4,<9" onChange={this.headerChange} />
				// 		</div>
				// 		<div>
				// 			<h4>Number of Toppings (number of words)</h4>
				// 			<label htmlFor="small">Just the meat please!</label>
				// 			<input type="radio" id="small" name="numberOfWords" onChange={this.headerChange} checked/>
				// 			<label htmlFor="regular">Regular</label>
				// 			<input type="radio" id="regular" name="numberOfWords" onChange={this.headerChange} />
				// 			<label htmlFor="large">I can't fit it in my mouth.</label>
				// 			<input type="radio" id="large" name="numberOfWords" onChange={this.headerChange} />
				// 		</div>
						
				// 	</div>
				// </nav>