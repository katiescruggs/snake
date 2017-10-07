const Game = require('./Game.js');
const Snake = require('./Snake.js');


const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const game = new Game(context, canvas.width, canvas.height);
game.startGame();

window.addEventListener('keydown', function(event) {
	if(event.keyCode === 37) {
		game.snake.changeDirection('left');
	} else if(event.keyCode === 38) {
		game.snake.changeDirection('up');
	} else if(event.keyCode === 39) {
		game.snake.changeDirection('right');
	} else {
		game.snake.changeDirection('down');
	}
});


let score = 0;
var scoreSpan = document.querySelector('.score');
scoreSpan.innerText = score;




