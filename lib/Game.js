const Snake = require('./Snake.js');
const Food = require('./Food.js');

module.exports = class Game {
	constructor(context, width, height) {
		this.context = context;
		this.width = width;
		this.height = height; 
		this.snake = new Snake ();

	}

	drawBody(context) {
		this.snake.body.forEach(function(block) {
		block.draw(context);
		})
	} 



	gameLoop() {
		console.log('gameloop');
		this.context.clearRect(0, 0, this.width, this.height)
		this.drawBody(this.context);
		this.snake.move();

		//continue animation
		setTimeout(this.gameLoop.bind(this), 500); 
	}

	startGame() {
		//start animation
		this.gameLoop();
	}

}