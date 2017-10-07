const Game = require('./Game.js');
const Snake = require('./Snake.js');


const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const game = new Game(context, canvas.width, canvas.height);

canvas.focus();
game.startGame();

window.addEventListener('keydown', function(event) {
  game.snake.changeDirection(event.keyCode);
});





