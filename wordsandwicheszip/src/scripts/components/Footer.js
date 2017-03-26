import React from 'react';

export default class Footer extends React.Component{
	constructor(){
		super();
		this.modal = this.modal.bind(this);
		this.close = this.close.bind(this);
	}
	modal(){
		// Get the modal, modalBtn, and closing span
		let modal = document.getElementById('modal');
		let btn = document.getElementById("modalBtn");

		// When the user clicks on the button, open the modal 
		btn.onclick = function() {
		    modal.style.display = "block";
		}
	}
	close(){
		let span = document.getElementById("close");
		let modal = document.getElementById('modal');
		// When the user clicks on the close button, closes modal
		span.onclick = function() {
		    modal.style.display = "none";
		}
	}
	render(){
		return(
			<footer>
				<h2>Chef'd by <a href="http://www.kurtwilliam.com">Kurt</a></h2>
				<button id="modalBtn" onClick={this.modal}>
				<i className="fa fa-info-circle" aria-hidden="true"></i>
				</button>
				<div id="modal">
					<div className="modalContent">
						<span id="close" onClick={this.close}>&times;</span>
						<p>Try to find all of the words! Words are 3-5 letters long and usually verbs. Each letter belongs to a word, and even if you guess a real word it might not be the right word. Good luck!</p>
					</div>
				</div>
			</footer>
		)
	}
}