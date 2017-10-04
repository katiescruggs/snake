const Snake = require('./Snake.js');
const Food = require('./Food.js');

module.exports = class Game {
	constructor(context, width, height) {
		this.context = context;
		this.width = width;
		this.height = height; 
		this.snake = new Snake(this.width, this.height);
		this.food = new Food("x", "y", 20, 20, 'red', this.width, this.height)
			console.log(this.food)
	}

	drawBody(context) {
		this.snake.body.forEach(function(block) {
		block.draw(context);
		})
	} 

	drawFood (context) {
		this.food.draw(context)
	}


	gameLoop() {
		this.context.clearRect(0, 0, this.width, this.height)
		this.drawBody(this.context);
		this.snake.move();
		this.drawFood(this.context);

		//continue animation
		setTimeout(this.gameLoop.bind(this), 300); 
	}

	startGame() {
		//start animation
		this.gameLoop();

	}

}