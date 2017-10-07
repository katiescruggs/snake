const Snake = require('./Snake.js');
const Food = require('./Food.js');

let image = document.getElementById('test-img');

module.exports = class Game {
	constructor(context, width, height) {
		this.context = context;
		this.width = width;
		this.height = height; 
		this.snake = new Snake(this.width, this.height);
		this.food = new Food("x", "y", 20, 20, 'red', this.width, this.height);

		this.score = 0;
	}

	drawBody(context) {
		this.snake.body.forEach(function(block) {
		block.draw(context, image);
		})
	} 

	// drawFood (context) {
	// 	this.food.draw(context, image)
	// }

	gameLoop() {
		this.context.clearRect(0, 0, this.width, this.height)
		this.drawBody(this.context, image);
		this.snake.move();
		this.food.draw(this.context, this.food.foodImage);

		//this.drawFood(this.context, image);

		if (this.snake.hitWall()) {
			console.log('game over')
		}
		

		if (this.snake.onSnakeCoordinates(this.snake.body[0])){
			console.log('DEAD')
		}

		//food checks if it's being eaten
		if(this.food.checkEaten(this.snake.body[0].x, this.snake.body[0].y, this.snake.body[1].x, this.snake.body[1].y)) {
			console.log('yummm');
			this.food.getEaten();
			if (this.snake.onSnakeCoordinates(this.food)){
				this.food.getEaten();
			}

			this.snake.grow();
			this.score++;
			document.querySelector('.score').innerText = this.score;

		}

		//continue animation
		setTimeout(this.gameLoop.bind(this), 300); 
	}

	startGame() {
		document.querySelector('.score').innerText = this.score;

		//start animation
		this.gameLoop();

	}

}