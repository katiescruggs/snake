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


		//food checks if it's being eaten
		if(this.food.checkEaten(this.snake.body[0].x, this.snake.body[0].y, this.snake.body[1].x, this.snake.body[1].y)) {
			console.log('yummm');
			this.food.getEaten();
			if (this.snake.onSnakeCoordinates(this.food)){
				this.food.getEaten();
			}

			this.snake.grow();
			console.log('score increases');
		}

		//continue animation
		setTimeout(this.gameLoop.bind(this), 300); 
	}

	startGame() {
		//start animation
		this.gameLoop();

	}

}