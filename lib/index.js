const Game = require('./Game.js');

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const game = new Game(context, canvas.width, canvas.height);
let easyButton = document.getElementById('easy');
let difficultButton = document.getElementById('difficult');
let startScreen = document.getElementById('start-screen');
let instructionScreen = document.getElementById('instruction-screen');
let startButton = document.getElementById('start');

canvas.focus();


window.addEventListener('keydown', function(event) {
  game.snake.changeDirection(event.keyCode);
});

easyButton.addEventListener('click', function() {
  hideStartScreen();
  displayInstructions();
});

difficultButton.addEventListener('click', function() {
  hideStartScreen();
  displayInstructions();
  
});

startButton.addEventListener('click', function() {
  instructionScreen.classList.add('hide');
  game.startGame();
})

function displayInstructions () {
  instructionScreen.classList.remove('hide');

}

function hideStartScreen () {
  startScreen.classList.add('hide');
}

