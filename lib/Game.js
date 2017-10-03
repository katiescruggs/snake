const Snake = require('./Snake.js');
const Food = require('./Food.js');

module.exports = class Game {
	constructor(context, width, height) {
		this.context = context;
		this.width = width;
		this.height = height; 
		this.snake = new Snake ();

	}

	gameLoop(context) {

	this.snake.body.forEach(function(block) {
		
		
		block.draw(context);


	})
	//continue animation
	requestAnimationFrame(this.gameLoop(context));

	}

	startGame() {
	//start animation

	requestAnimationFrame(this.gameLoop(this.context));
	}

}