const Game = require('./Game.js');
const Snake = require('./Snake.js');

const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
let game = new Game(context, canvas.width, canvas.height, document.getElementById('food-img') );

let instructionScreen = document.getElementById('instruction-screen');
let gameOverScreen = document.getElementById('game-over-screen')

window.addEventListener('keydown', function(event) {
  if (event.keyCode === 32) {
    resetGame();

  }
  else if (event.keyCode === 37 ||
   event.keyCode === 38 || 
   event.keyCode === 39 ||
   event.keyCode === 40) 
  {
    game.snake.changeDirection(event.keyCode);
  }
  
});

document.getElementById('easy').addEventListener('click', function() {
  
  hideStartScreen();
  displayInstructions();
  game.speed = 180;
  game.displayScore();
  game.snake.drawBody();
});

document.getElementById('difficult').addEventListener('click', function() {
  hideStartScreen();
  displayInstructions();
  game.speed = 100;
  game.displayScore();
  
});

document.getElementById('start-screen').addEventListener('click', function() {
  instructionScreen.classList.add('hide');
  
});


  function resetGame () {
  gameOverScreen.classList.add('hide');
  var currentSpeed = game.speed;
  game = new Game(context, canvas.width, canvas.height)
  game.speed = currentSpeed;
  game.startGame();
  }

document.getElementById('play-again').addEventListener('click', resetGame);

function displayInstructions () {
  instructionScreen.classList.remove('hide');

}

function hideStartScreen () {
  document.getElementById('start-screen').classList.add('hide');
}



