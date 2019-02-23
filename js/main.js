!function() {
	const startScreen = document.querySelector('#start');
	const startButton = document.querySelector('#start-button');
	let gameHasStarted = false;
	
	const boardScreen = document.querySelector('#board');
	const player1 = document.querySelector('#player1');
	const player2 = document.querySelector('#player2');
	const boxes = document.querySelector('.boxes');
	const boxesArray = document.querySelectorAll('.boxes li');
	let oSquares = [];
	let xSquares = [];
	let winner;
	
	const winScreen = document.querySelector('#finish');
	const winMessage = document.querySelector('.message');
	const newGameButton = document.querySelector('#new-game-button');
	
	// Function for hiding an element
	function displayNone(element) { element.style.display = 'none' }; 
	// Function for displaying an element
	function displayBlock(element) { element.style.display = 'block' }; 
	
	
	/****** START SCREEN ******/
	// When the page loads, hide the board and win screens
	displayNone(boardScreen);
	displayNone(winScreen);
	
	// When the player clicks the start button, start the game 
	startButton.addEventListener('click', () => {
		// Hide the start screen
		displayNone(startScreen);
		// Show the board
		displayBlock(boardScreen);
	});
	
	
	/****** SETTING UP THE BOARD ******/
	// Player O goes first 
	let playersTurn = 'o';
	player1.className += ' active';
	
	// Display the player's letter when they mouse over the boxes if it's not already filled
	boxes.addEventListener('mouseover', (event) => {
		if(!event.target.className.includes('box-filled')) {
			event.target.style.backgroundImage = 'url("img/' + playersTurn + '.svg")';
		}
	});
	
	// Make the letter disappear when the player mouses out, if the box is not filled
	boxes.addEventListener('mouseout', (event) => {
		if(!event.target.className.includes('box-filled')) { 
			event.target.style.backgroundImage = '';
		}
	});
	
	
	/****** GAMEPLAY ******/
	boxes.addEventListener('click', ()=> {
		// If the box does not have a box-filled class, allow the player to choose it
		if(!event.target.className.includes('box-filled')) {

			// Apply the corresponding class to the selected box	
			if(playersTurn === 'o') {
				event.target.className += ' box-filled-1';	
				// Add the number the square selected to the oSquares array 
				oSquares.push(parseInt(event.target.id));
			} else {
				event.target.className += ' box-filled-2';
				// Add the number of the square selected to the xSquares array 
				xSquares.push(parseInt(event.target.id));
			}
			
			// Add the active class to the player who's turn it is, and remove it from the other player
			if(playersTurn === 'o') {
				player2.className += ' active';
				player1.className = 'players';
				playersTurn = 'x';
			} else {
				player1.className += ' active';
				player2.className = 'players';
				playersTurn = 'o';
			}
			
			/****** WINNING THE GAME ******/
			// If all the squares are filled, end the game and show the tie screen
			if(oSquares.length + xSquares.length == 9) {
				winMessage.textContent = 'You tied!';
				winScreen.className = 'screen screen-win screen-win-tie';
				displayBlock(winScreen);
			}
			
			// Function that checks if the given array contains all of the 3 numbers it is passed
			function checkIfIncludes(arrayName, num1, num2, num3) {
				if( arrayName.includes(num1) && arrayName.includes(num2) && arrayName.includes(num3) ) {
					return true;
				}
			}
			
			// Check if either player has won
			if(
				checkIfIncludes(oSquares, 1, 2, 3) ||
				checkIfIncludes(oSquares, 4, 5, 6) ||
				checkIfIncludes(oSquares, 7, 8, 9) ||
				checkIfIncludes(oSquares, 1, 4, 7) ||
				checkIfIncludes(oSquares, 2, 5, 8) ||
				checkIfIncludes(oSquares, 3, 6, 9) ||
				checkIfIncludes(oSquares, 1, 5, 9) ||
				checkIfIncludes(oSquares, 3, 5,	7) ) {
					winner = 'o';
			} else if (
				checkIfIncludes(xSquares, 1, 2, 3) ||
				checkIfIncludes(xSquares, 4, 5, 6) ||
				checkIfIncludes(xSquares, 7, 8, 9) ||
				checkIfIncludes(xSquares, 1, 4, 7) ||
				checkIfIncludes(xSquares, 2, 5, 8) ||
				checkIfIncludes(xSquares, 3, 6, 9) ||
				checkIfIncludes(xSquares, 1, 5, 9) ||
				checkIfIncludes(xSquares, 3, 5,	7) ) {
					winner = 'x';
			}

			// If the winner is O then display the O win screen
			if(winner == 'o') {
				winMessage.textContent = 'Winner';
				winScreen.className = 'screen screen-win screen-win-one';
				displayBlock(winScreen);
			// If the winner is X then display the X win screen
			} else if (winner == 'x') {
				winScreen.className = 'screen screen-win screen-win-two';
				winMessage.textContent = 'Winner';
				displayBlock(winScreen);
			} 			
		}
	});
	
	
	/****** NEW GAME ******/
	// When the New Game button is pressed, start a new game 
	newGameButton.addEventListener('click', () => {
		// Reset values
		oSquares = [];
		xSquares = [];
		winner = 0;
	
		// Player O goes first 
		playersTurn = 'o';
		player2.className = 'players';
		player1.className += ' active';
		
		// Clear all boxes of Xs and Os
		for(let i=0; i < boxesArray.length; i++) {
			boxesArray[i].className = 'box';
			boxesArray[i].style.backgroundImage = '';
		}
		
		// Hide the win screen
		displayNone(winScreen);
		// Show the board
		displayBlock(boardScreen);
		
	});
	
}();
	
	
	
	
	
