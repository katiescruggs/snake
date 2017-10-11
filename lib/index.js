const Game = require('./Game.js');
const Snake = require('./Snake.js');

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
let game = new Game(context, canvas.width, canvas.height, document.getElementById('food-img') );


let easyButton = document.getElementById('easy');
let difficultButton = document.getElementById('difficult');
let startScreen = document.getElementById('start-screen');
let instructionScreen = document.getElementById('instruction-screen');
let startButton = document.getElementById('start');
let playAgainButton = document.getElementById('play-again');
let gameOverScreen = document.getElementById('game-over-screen')
let image = document.getElementById('test-img');


window.addEventListener('keydown', function(event) {
  game.snake.changeDirection(event.keyCode);
});

easyButton.addEventListener('click', function() {
  hideStartScreen();
  displayInstructions();
  game.speed = 180;
  game.displayScore();
});

difficultButton.addEventListener('click', function() {
  hideStartScreen();
  displayInstructions();
  game.speed = 100;
  game.displayScore();
  
});

startButton.addEventListener('click', function() {
  instructionScreen.classList.add('hide');
  game.startGame();
});

playAgainButton.addEventListener('click', function() {
  gameOverScreen.classList.add('hide');
  var currentSpeed = game.speed;
  game = new Game(context, canvas.width, canvas.height)
  game.speed = currentSpeed;
  game.startGame();

});

function displayInstructions () {
  instructionScreen.classList.remove('hide');

}

function hideStartScreen () {
  startScreen.classList.add('hide');
}

//Images

const caterHeadVert = document.getElementById('cater-head-vertical');
const caterHeadHori = document.getElementById('cater-head-horizontal');














