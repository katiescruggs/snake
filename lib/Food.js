const Block = require('./Block.js');

module.exports = class Food extends Block{
	constructor (x, y, w, h, color, gameW, gameH){
		super(x, y, w, h, color);
		this.gameW = gameW;
		this.gameH = gameH;

		this.x = Math.round(Math.floor((Math.random() * (this.gameW-this.w))) / 25) * 25;
		this.y = Math.round(Math.floor((Math.random() * (this.gameH-this.h))) / 25) * 25;

	}

	checkEaten(snakeHeadX, snakeHeadY, snakeBodyX, snakeBodyY) {
		if(snakeHeadX === this.x && snakeHeadY === this.y) {
			return true;
		}
		if(snakeBodyX === this.x && snakeBodyY === this.y) {
			return true;
		}
	}

	getEaten() {
		this.x = Math.round(Math.floor((Math.random() * (this.gameW-this.w))) / 25) * 25;
		this.y = Math.round(Math.floor((Math.random() * (this.gameH-this.h))) / 25) * 25;
	}



}