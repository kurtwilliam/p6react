import React from 'react';
import ReactDOM from 'react-dom';
import {ajax} from 'jquery';
import Header from './components/Header.js';

const app_id = "dba7c455";
const app_key = "8ff409b8e0d5a7ff34466546fe3d19f8";
// const apiKey = "lmaYqqmX9hmshjss7LPRrHpkU3W6p1HAl7AjsnAILtU4QG0HMz"; - MASHAPE

let offsetRando = Math.floor(Math.random()*5543);

class App extends React.Component {
	constructor() {
		super();
		this.state = {
			words: []
		}
		this.randoArrayPull = this.randoArrayPull.bind(this);
		this.userInputVerification = this.userInputVerification.bind(this);
		// console.log(this.words)

	}
	randoArrayPull(i) {
		// Generate a random number of array length to sub in as an array index value 
		let arrayNum = Math.floor(Math.random()*5000);


		let wordsArray = this.state.words;
		console.log(wordsArray);

		let filteredWords = wordsArray.filter((word) => {
			return word.word.match(/\'|\-|\ /ig) === null
		})
		
		// Create shuffle filtered words function using Fisher-Yates Shuffle
		function shuffle(array) {
		  var currentIndex = array.length, temporaryValue, randomIndex;

		  // While there remain elements to shuffle...
		  while (0 !== currentIndex) {

		    // Pick a remaining element...
		    randomIndex = Math.floor(Math.random() * currentIndex);
		    currentIndex -= 1;

		    // And swap it with the current element.
		    temporaryValue = array[currentIndex];
		    array[currentIndex] = array[randomIndex];
		    array[randomIndex] = temporaryValue;
		  }
		  return array;
		}

		// Shuffle filteredWords array
		filteredWords = shuffle(filteredWords);

		// Select the first 30 results and store them in another array, the answerKey
		let answerKey = filteredWords.slice(0, 20);



		console.log(answerKeyReduce);

		// var sum = [1, 2, 3].reduce(
		//   function(total, num){ return total + num }
		//   , 0);


		// var a = "I want apple";
		// var b = "an";
		// var position = 6;
		// var output = [a.slice(0, position), b, a.slice(position)].join('');
		// console.log(output);
		// for (i = 0; i < answerKey.length; i++) {
		// 	let wordStr = `${answerKey[0].word}`;
		// 	let wordStrLen = wordStr.length;
		// 	if (i > 4){
		// 		// Create random values to sub in for index values
		// 		let randomOffset = [-1, -2, -3, -4];
		// 		let randomOffsetValue = Math.floor(Math.random()*4);

		// 	   let insertWord = answerKey[i].word;
		// 	   // let outerWord = answerKey[i + randomOffset[randomOffsetValue]].word;
		// 	   let position = Math.floor(Math.random()*wordStrLen);
		// 	   let fullWord = [wordStr.slice(0, position), insertWord, wordStr.slice(position)].join('');
		// 		console.log(fullWord);
		// 	}
		// 	console.log(wordStr);
		// 	// let outerWord = answerKey[i];
		// 	// let innerWord = answerKey[i + 1];
		// 	// let position = Math.floor(Math.random()*answerKey.length);
		// 	// console.log(position);
		// 	// console.log(innerWord);
		// 	// console.log(outerWord);
		// }

		// Save new words into an array (answer key) so we can later verify if a user inputted a real result - already from previous step

		// Insert one result from array into another result from the array... aka cut up a word and insert a new word

		// reduce - two words at a time, take the one word, split it somewhere, then return that, then split somewhere and return 
	}
	userInputVerification(){
		// Make function that on submission of a user input, verifies if the value inputted matches the value of a value in the answerKey array. 
		// If it does, add +1 to score, and delete the value from the array.
		// Else, -1 from the score

		// for (var i = 0; i < myArray.length; i++) {
		//     if (agent == myArray[i])
		//         return true;
		// }
		// return false;
	}

	render(){
		return (
			<div>
				<Header />
				<h4>Show me a word! AHH! {this.state.words}</h4>
				<button onClick={this.randoArrayPull}>Random Array</button>
				<form onSubmit={this.randoArraySubmit}>
					<input  />
				</form>
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
					offset: 0,
					word_length: ">4,<10",
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
