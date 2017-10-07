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
		this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
	}

	drawBody(context) {

		if(this.snake.body[0].direction === 'up') {
			this.snake.body[0].draw(context, this.snake.snakeImages[0]);
		} else if(this.snake.body[0].direction === 'down') {
			this.snake.body[0].draw(context, this.snake.snakeImages[1]);
		} else if(this.snake.body[0].direction === 'left') {
			this.snake.body[0].draw(context, this.snake.snakeImages[2]);
		} else {
			this.snake.body[0].draw(context, this.snake.snakeImages[3]);
		}

		for(var i = 1; i < this.snake.body.length - 1; i++) {
			if(this.snake.body[i].direction === 'left' || this.snake.body[i].direction === 'right') {
				this.snake.body[i].draw(context, this.snake.snakeImages[8]);
			} else {
				this.snake.body[i].draw(context, this.snake.snakeImages[9]);
			}
		}

		if(this.snake.body[this.snake.body.length-1].direction === 'up') {
			this.snake.body[this.snake.body.length-1].draw(context, this.snake.snakeImages[4]);
		} else if(this.snake.body[this.snake.body.length-1].direction === 'down') {
			this.snake.body[this.snake.body.length-1].draw(context, this.snake.snakeImages[5]);
		} else if(this.snake.body[this.snake.body.length-1].direction === 'left') {
			this.snake.body[this.snake.body.length-1].draw(context, this.snake.snakeImages[6]);
		} else {
			this.snake.body[this.snake.body.length-1].draw(context, this.snake.snakeImages[7]);
		}
	} 

	gameLoop() {
		this.context.clearRect(0, 0, this.width, this.height)
		this.drawBody(this.context, image);
		this.snake.move();
		this.food.draw(this.context, this.food.foodImage);


		if (this.snake.hitWall()) {
			console.log('game over')
		}
		

		if (this.snake.onSnakeCoordinates(this.snake.body[0])){
			console.log('DEAD')
		}

		//food checks if it's being eaten
		if(this.food.checkEaten(this.snake.body[0].x, this.snake.body[0].y, this.snake.body[1].x, this.snake.body[1].y)) {
			this.food.getEaten();
			if (this.snake.onSnakeCoordinates(this.food)){
				this.food.getEaten();
			}

			this.snake.grow();
			this.raiseScore();

		}

		//continue animation
		setTimeout(this.gameLoop.bind(this), 300); 
	}

	startGame() {
		document.querySelector('.score').innerText = this.score;
		document.querySelector('.high-score').innerText = this.highScore;

		//start animation
		this.gameLoop();

	}

	raiseScore() {
		this.score++;
		document.querySelector('.score').innerText = this.score;

		if(this.score > this.highScore) {
			this.highScore = this.score;
			document.querySelector('.high-score').innerText = this.highScore;

			let highScoreStr = this.highScore.toString();
			localStorage.setItem('highScore', highScoreStr);
		}
	}





}