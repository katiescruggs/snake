const Game = require('./Game.js');

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const game = new Game(context, canvas.width, canvas.height);
let easyButton = document.getElementById('easy');
let difficultButton = document.getElementById('difficult');
let startScreen = document.getElementById('start-screen');
let instructionScreen = document.getElementById('instruction-screen');
let startButton = document.getElementById('start');
let playAgainButton = document.getElementById('play-again');
let gameOverScreen = document.getElementById('game-over-screen')
let image = document.getElementById('test-img');

canvas.focus();


window.addEventListener('keydown', function(event) {
  game.snake.changeDirection(event.keyCode);
});

easyButton.addEventListener('click', function() {
  hideStartScreen();
  displayInstructions();
  game.displayScore();
});

difficultButton.addEventListener('click', function() {
  hideStartScreen();
  displayInstructions();
  game.displayScore();
  
});

startButton.addEventListener('click', function() {
  instructionScreen.classList.add('hide');
  game.startGame();
});

playAgainButton.addEventListener('click', function() {
gameOverScreen.classList.add('hide');
game.startGame();




// document.querySelector('.game-over-score').innerText = game.score;
// document.querySelector('.game-over-high-score').innerText = game.highScore;

// this.context.clearRect(0, 0, this.width, this.height)

// game.stillPlaying = true;
// game.startGame();

});

function displayInstructions () {
  instructionScreen.classList.remove('hide');

}

function hideStartScreen () {
  startScreen.classList.add('hide');
}

