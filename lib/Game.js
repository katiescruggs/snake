const Snake = require('./Snake.js');
const Food = require('./Food.js');

module.exports = class Game {
  constructor(context, width, height, foodImage) {
    this.context = context;
    this.width = width;
    this.height = height; 
    this.snake = new Snake(this.width, this.height);
    this.food = new Food("x", "y", 30, 30, 'red', this.width, this.height, foodImage);
    this.score = 0;
    this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
    this.stillPlaying = true;
    this.speed;
  }

  gameLoop() {
    this.context.clearRect(0, 0, this.width, this.height);
   
    if (this.snake.hitWall()) {
      this.stillPlaying = false;
      console.log('still playing = false');
    }

    if (this.snake.onSnakeCoordinates(this.snake.body[0])){
      this.stillPlaying = false;
      console.log('still playing = false');
    }

    if(this.snake.eat(this.food)) {
      this.food.resetCoordinates();
      if (this.snake.onSnakeCoordinates(this.food)){
        this.food.resetCoordinates();
      }
      this.snake.grow();
      this.raiseScore();
    }

    if(this.stillPlaying) {
	    this.snake.move();
	    this.snake.drawBody(this.context);
	    this.food.draw(this.context);
	    //console.log('check if still playing');
	    setTimeout(this.gameLoop.bind(this), this.speed); 
    } else {
    	this.context.clearRect(0, 0, this.width, this.height);
      this.snake.drawBody(this.context);
      document.getElementById('game-over-screen').classList.remove('hide');
      this.endDisplayScore();
    }
  }

  displayScore() {
    document.querySelector('.score').innerText = this.score;
    document.querySelector('.high-score').innerText = this.highScore;
  }

  endDisplayScore() {
    document.querySelector('.end-score').innerText = this.score;
    document.querySelector('.end-high-score').innerText = this.highScore;
  }

  startGame() {
    //start animation
    this.gameLoop();
  }

  raiseScore() {
    this.score++;
    document.querySelector('.score').innerText = this.score;

    if(this.score > this.highScore) {
      this.highScore = this.score;
      document.querySelector('.high-score-message').innerHTML = "<p> <img src = './lib/images/trophy.png' alt ='high score trophy image'/> <strong>You set a high score!</strong></p>";
      let highScoreStr = this.highScore.toString();
      localStorage.setItem('highScore', highScoreStr);
    }
  }
};
