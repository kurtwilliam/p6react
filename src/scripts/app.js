import React from 'react';
import ReactDOM from 'react-dom';
import {ajax} from 'jquery';
import Header from './components/Header.js';
import Footer from './components/Footer.js';

const app_id = "dba7c455";
const app_key = "8ff409b8e0d5a7ff34466546fe3d19f8";
// const apiKey = "lmaYqqmX9hmshjss7LPRrHpkU3W6p1HAl7AjsnAILtU4QG0HMz"; - MASHAPE

let offsetRando = Math.floor(Math.random()*2195);
let wordApp = {};

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			words: [],
			userInput: "",
			answerKeys: [],
			wordStr: '',
			points: 30,
			noWords: '10',
			gameOver: ''
		}
		this.randoArrayPull = this.randoArrayPull.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.inputVer = this.inputVer.bind(this);
		this.points = this.points.bind(this);
		this.gameOver = this.gameOver.bind(this);
	}
	randoArrayPull(i) {
		// Generate a random number of array length to sub in as an array index value
		window.clearInterval(wordApp.countdown);
		this.state.points = 30;

		let arrayNum = Math.floor(Math.random()*5000);

		let wordsArray = this.state.words;

		let filteredWords = wordsArray.filter((word) => {
			return word.word.match(/\'|\-|\ /ig) === null
		})
		
		// Create shuffle filtered words function using Fisher-Yates Shuffle
		function shuffle(array) {
		  var currentIndex = array.length, temporaryValue, randomIndex;

		  // While there remain elements to shuffle
		  while (0 !== currentIndex) {

		    // Pick a remaining element
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		  }
		  return array;
		}

		// Shuffle filteredWords array
		filteredWords = shuffle(filteredWords);

		// Select the first few results based on the difficulty and store them in another array, the answerKey
		// Use this to later verify if a user inputted a real result

		// const easyAmnt = 10;
		// const medAmnt = 15;
		// const hardAmnt = 20;
	
		// if ( radio id=small is checked ){ this.state.noWords = easyAmnt } else if ( radio id=regular is checked ){ this.state.noWords = medAmnt } else ( radio id=large is checked ){ this.state.noWords = hardAmnt }

		let answerKey = filteredWords.slice(0, 10);

		wordApp.answerKey = [];

		for ( i = 0; i < answerKey.length; i++ ) {
			wordApp.answerKey.push(answerKey[i].word)
		}

		// Make a string we can combine all of the words in!
		let wordStr = ``;

		// Iterate through each word in the answer key and insert it into wordStr 
		for (i = 0; i < wordApp.answerKey.length; i++) {
			// redefine wordStr's length each iteration to randomly insert a word
			let wordStrLen = wordStr.length;
			// set a var = each word
		   let word = wordApp.answerKey[i];
		   // generate a random position to insert the word into the full wordStr
		   let position = Math.floor(Math.random()*wordStrLen);
		   // Cut up wordStr in a random place, insert this iteration of the word at a random position, then put wordStr back together
		   let fullWord = [wordStr.slice(0, position), word, wordStr.slice(position)].join('');
			// set value of wordStr to newly generated string fullWord
			wordStr = fullWord;
			console.log(wordStr)
		}
		console.log(wordApp.answerKey);
		this.setState({
			answerKeys: wordApp.answerKey,
			wordStr
		})
		this.points();
		let quizButton = document.querySelector('.quizButton')
		quizButton.classList.toggle('hidden');
	}
	points(){
		// Create a points system that goes down by 1 point every second. 
		wordApp.countdown = window.setInterval(() => {
			// Update the h4 text with the number of seconds
		  	let points = this.state.points;
			// Decrement the number of seconds left
			// console.log("sdfsdfdsf", this.state.points);
			points = points -1;

			// stop the points from decreasing at -30 points
			if(points <= 0) {
				window.clearInterval(wordApp.countdown);
				this.gameOver();
			}
			this.setState({
				points: points
			}) 
		},1000);
	}
	handleChange(e){
		e.preventDefault();

		this.setState({
			userInput: e.target.value,
		})
	}
	gameOver(){
		if ( this.state.points <= 0 ){
			this.setState({
				gameOver: "You Win!",
				wordStr: ''
			})
			let quizButton = document.querySelector('.quizButton')
			quizButton.classList.toggle('hidden');
		} else if ( this.state.wordStr === '' ) {
			window.clearInterval(wordApp.countdown);
			this.setState({
				gameOver: "You Lose! HAHAHA",
				wordStr: ''
			})
			let quizButton = document.querySelector('.quizButton')
			quizButton.classList.toggle('hidden');
		}
	}
	inputVer(e){
		// Make function that on submission of a user input, verifies if the value inputted matches the value of a value in the answerKey array. 
		// If it does, make it evaluate the wordStr to find a matching string.
		// If it does, add +1 to score, delete the value from the key, and from the string displayed on the page.
		// Else, -1 from the score

		// Prevent browser refresh
		e.preventDefault();

		// Make clone of answerKeys, userInput, wordStr, and points
		let inputState = Array.from(this.state.answerKeys);
		let inputUser = this.state.userInput;
		let wordPara = this.state.wordStr;
		let newPoints = this.state.points;

		// Find the index of the answerKeys from the userInput if they match
		let indexKey = inputState.indexOf(this.state.userInput);

		// Search wordPara for userInput
		const wordStrInput = wordPara.search(inputUser);
		console.log(wordStrInput);
		// if correct (can find it in the word paragraph and answerKey)
		if ( indexKey >= 0 && wordStrInput >= 0 ) {
			// Remove user input from Array 
			inputState.splice(indexKey, 1);
			// Remove user input from word paragraph 
			let newWordPara = wordPara.replace(inputUser, '');
			wordPara = newWordPara;
			// Add 1 point to score
			this.setState({
				points: newPoints + 5
			})

			console.log('bueno')
		} else { 
			// remove three points
			this.setState({
				points: newPoints -1
			})

			console.log('no bueno');
		}

		if ( wordPara === '' ){
			this.gameOver();
		}

		// Update the state of the answerKeys, reset input field, and update the word paragraph
		this.setState({
			answerKeys: inputState,
			userInput: '',
			wordStr: wordPara
		});
	}

	render(){
		return (
			<div className="enclosing">
				<Header />
				<div className="triangleLeft"></div>
				<div className="triangleRight"></div>
				<div className="wrapper">
					<div className="main">
						<h4 className="points">Score: {this.state.points}</h4>
						<div>
							<p>{this.state.wordStr}</p>
						</div>
						<h2>{this.state.gameOver}</h2>
						<button className='quizButton' onClick={this.randoArrayPull}>Feed me!</button>
						<form onSubmit={this.inputVer}>
							<input className="userInput" name="userInput" value={this.state.userInput} onChange={this.handleChange} placeholder="type a word here!" />
							<button type="submit">Answer!</button>
						</form>
					</div>
				</div>
				<Footer />
			</div>
		)
	}
	componentDidMount(){
		ajax({
			url: `http://proxy.hackeryou.com`,
			type: 'GET',
			dataType: 'json',
			data:{
				reqUrl: "https://od-api.oxforddictionaries.com:443/api/v1/wordlist/en/lexicalCategory%3DVerb",
				xmlToJSON: "false",
				proxyHeaders:{
					"Accept": "application/json",
					"app_id": app_id,
					"app_key": app_key
				},
				params:{
					offset: offsetRando,
					word_length: '>2,<6',
					exact: false
				}
			}
			}).then((data) =>{
				this.setState({
					words: data.results
				});
				// this.state.words.push(data.results);
			console.log(data.results);
		});
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
