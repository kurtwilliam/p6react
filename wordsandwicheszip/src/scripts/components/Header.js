import React from 'react';

export default class Header extends React.Component{
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
				<div className="triangleLeft"></div>
				<div className="triangleRight"></div>
			</header>
		)
	}
}