/* 
This page uses the minimax algorithm to program an unbeatable AI
This website was used as reference
https://medium.freecodecamp.org/how-to-make-your-tic-tac-toe-game-unbeatable-by-using-the-minimax-algorithm-9d690bad4b37
*/

window.onload = initPage;

// The page load function
function initPage() {
	// Variables to hold the required DOM elements
	var menu = document.getElementById("main-menu");
	var mainContent = document.getElementById("main");
	var startButton = document.getElementById("start-button");
	var boardArea = document.getElementById("game-board");
	var tttGrid = document.getElementsByTagName("td");
	var restartButton = document.getElementById("button-area");
	var gameOverBanner = document.getElementById("game-over");
	var gameOverMessage = document.getElementById("game-over-message");
	// Array corresponding to an empty game board
	var gameBoard = [];

	// Function for fading an element in. Note: This could have been done with the
	// jquery function, but this page was created before the lesson on jquery
	function fadeIn(element) {
		var currentOpacity = 0;

		var fadeInterval = setInterval(addOpacity, 1);

		function addOpacity(){
			if (currentOpacity < 1){
				currentOpacity += 0.005;
				element.style.opacity = currentOpacity;
			}
			else{
				clearInterval(fadeInterval);
			}
		}
	}

	// Function that moves an element right until it is 600px from the left side of
	// the page, meanwhile also increasing the opacity
	function moveLeftToCenter(element) {
		var currentPosition = -500;
		var currentOpacity = 0.01;

		var moveInterval = setInterval(shiftRight, 0);

		function shiftRight(){
			if (currentPosition != 600){
				currentPosition += 10;
				currentOpacity += 0.009
				element.style.left = currentPosition + "px";
				element.style.opacity = currentOpacity;
			} 
			else{
				clearInterval(moveInterval);
			}
		}
	}

	// Calculations for the height of the header and height of the menu part of
	// the header
	var height = menu.offsetTop;
	var menuHeight = menu.clientHeight;

	// The onscroll function that handles the moving menu in the header
	function scrollFunction() {
		if (document.body.scrollTop > height 
			|| document.documentElement.scrollTop > height) {
			menu.classList.add("sticky");
			mainContent.style.marginTop = menuHeight+"px";
		}
		else {
			menu.classList.remove("sticky");
			mainContent.style.marginTop = "0px";
		}
	}

	// An array to store the patterns for winning tic-tac-toe lines
	var winningLines = [
		[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7],
		[2, 5, 8], [0, 4, 8], [2, 4, 6]
	]

	// Function to display the hidden game board
	function displayGameBoard(){
		startButton.style.display = "none";
		boardArea.style.display = "block";
	}

	// Resets the game board to its initial state
	function initGameBoard(){
		gameBoard = [0, 0, 0, 0, 0, 0, 0, 0, 0];
		for (let i=0; i<tttGrid.length; i++){
			tttGrid[i].tabIndex = "0";
			tttGrid[i].addEventListener("click", executeTurn);
			tttGrid[i].addEventListener("keypress", checkForEnter);
			symbolArea = tttGrid[i];
			symbolArea.innerHTML = "<img>";
		}
		gameOverBanner.style.display = "none";
	}

	// Disables the game board after the game has ended
	function disableGameBoard(){
		for (let i=0; i<tttGrid.length; i++){
			tttGrid[i].removeEventListener("click", executeTurn);
			tttGrid[i].removeEventListener("keypress", checkForEnter);
		}
	}

	// Function that runs when the player makes their move
	function executeTurn(cell) {
		var cellIndex = cell.target.id;
		var playerCellSymbol = 
			tttGrid[cellIndex].getElementsByTagName("img")[0];

		gameBoard[cellIndex] = "X";
		playerCellSymbol.src = "images/tictactoe-03.png";
		playerCellSymbol.alt = "Contestant's Symbol";
		tttGrid[cellIndex].removeEventListener("click", executeTurn);
		tttGrid[cellIndex].removeEventListener("keypress", checkForEnter);

		// Check if there is a draw
		if (isDraw()){
			gameOverBanner.style.display = "block";
			gameOverMessage.innerHTML = "It's A Draw!";
			disableGameBoard();
		}
		// Runs the function for the computer turn and check if they have won
		else{
			var aiMove = aiTurn("O");
			gameBoard[aiMove.location] = "O";
			var aiCellSymbol = 
				tttGrid[aiMove.location].getElementsByTagName("img")[0];
			aiCellSymbol.style.opacity = 0;
			aiCellSymbol.src = "images/tictactoe-04.png";
			aiCellSymbol.alt = "Computer's Symbol";
			fadeIn(aiCellSymbol);
			if (checkIfWon("O")){
				gameOverBanner.style.display = "block";
				gameOverMessage.innerHTML = "You Lose!";
				disableGameBoard();
			}
			tttGrid[aiMove.location].removeEventListener("click", executeTurn);
			tttGrid[aiMove.location].removeEventListener("keypress", 
				checkForEnter);
		}
	}

	// Function that checks if the entered symbol has won the game
	function checkIfWon(symbol){
		var gameOver = false;

		for (let i = 0; i < winningLines.length; i++){
			if (gameBoard[winningLines[i][0]] === symbol
				&& gameBoard[winningLines[i][1]] === symbol
				&& gameBoard[winningLines[i][2]] === symbol){
				gameOver = true;
			}
		}

		return gameOver;
	}

	// Get all the cells on the board that are available for a move still
	function getAvailableCells(){
		var availableCells = [];
		for (let i = 0; i < gameBoard.length; i++) {
			if (gameBoard[i] === 0){
				availableCells.push(i);
			}
		}
		return availableCells;
	}

	// Check if the result is a draw (or no moves are left)
	function isDraw(){
		var drawStatus = false;
		var availableCells = getAvailableCells();
		if (availableCells.length === 0) {
			drawStatus = true;
		}
		return drawStatus;
	}

	// Checks and returns the appropriate minimax value for the base case of the
	// recursive function (if the result is a player win, ai win, or draw)
	function checkBaseCase() {
		var returnValue = null;

		if (checkIfWon("X")) {
			returnValue = -1;
		}
		else if (checkIfWon("O")) {
			returnValue = 1;
		}
		else if (isDraw()) {
			returnValue = 0;
		}

		return returnValue;
	}

	// Constructor function for a Move object which will store the location of the
	// move and the resulting minimax value corresponding to the result of the move
	function Move(valueParam) {
		this.location;
		this.value = valueParam;
	}

	// Recursive function that executes the minimax algorithm to calculate the best
	// move for the ai player
	function aiTurn(symbol) {
		var availableCells = getAvailableCells()
		var moveList = [];

		// Checks the base case of the recursive function
		var turnStatus = checkBaseCase();
		if (turnStatus === -1){
			var move = new Move(turnStatus);
			return move;
		}
		else if (turnStatus === 1){
			var move = new Move(turnStatus);
			return move;
		}
		else if (turnStatus === 0){
			var move = new Move(turnStatus);
			return move;
		}

		// For every possible move the ai player can make, make that move
		// and run this function again but with the opposing player's symbol
		for (let i = 0; i < availableCells.length; i++) {
			var currentLocation = availableCells[i];
			var newMove = {
				location: null,
				value: null
			};

			newMove.location = currentLocation;
			gameBoard[currentLocation] = symbol;

			var nextMoveValue;
			if (symbol === "X") {
				nextMoveValue = aiTurn("O");
			}
			else {
				nextMoveValue = aiTurn("X");
			}

			newMove.value = nextMoveValue.value;
			gameBoard[currentLocation] = 0;
			moveList.push(newMove);
		}

		var bestMoveLocation;
		var targetValue;
		// Gets the best move location corresponding to the best move that 
		// your player can make (the move with the lowest value)
		if (symbol === "X"){
			targetValue = 100000;
			for (let i = 0; i < moveList.length; i++){
				if (moveList[i].value < targetValue){
						targetValue = moveList[i].value;
						bestMoveLocation = i;
				}
			}
		}
		// Gets the best move location corresponding to the best move that 
		// the ai player can make (the move with the highest value)
		else{
			targetValue = -100000;
			for (let i = 0; i < moveList.length; i++) {
				if (moveList[i].value > targetValue) {
						targetValue = moveList[i].value;
						bestMoveLocation = i;
				}
			}
		}

		// Return the best move
		return moveList[bestMoveLocation];
	}

	// function that checks if the enter key is being pressed on an element
	// (tab-abble content for accessibility purposes)
	function checkForEnter(event) {
		if(event.keyCode === 13) {
			this.click();
		}
	}

	// Variables to store the DOM elements for our animations
	var pageHeading = document.getElementById("page-heading");
	var challengeInfo = document.getElementsByClassName("row")[0];
	var instructions = document.getElementById("instructions");
	var instructionsContent = 
		instructions.getElementsByClassName("page-wrapper")[0];
		console.log(instructionsContent);

	// Running our animation functions, uses timeout for delay
	moveLeftToCenter(pageHeading);
	var challengeFade = setTimeout(fadeIn, 800, challengeInfo);
	var instructionsFade = setTimeout(fadeIn, 1800, instructionsContent);

	initGameBoard();
	startButton.addEventListener("click", displayGameBoard);
	startButton.addEventListener("keypress", checkForEnter);
	restartButton.addEventListener("click", initGameBoard);
	restartButton.addEventListener("keypress", checkForEnter);
	window.onscroll = scrollFunction;
}