const Snake = require('./Snake.js');
const Food = require('./Food.js');

module.exports = class Game {
	constructor(context, width, height) {
		this.context = context;
		this.width = width;
		this.height = height; 
		this.snake = new Snake ();

	}

	gameLoop() {

	this.snake.body.draw(this.context);
	//continue animation
	requestAnimationFrame(this.gameLoop.bind(this));

	}

	startGame() {
	//start animation
	requestAnimationFrame(this.gameLoop.bind(this));
	}

}