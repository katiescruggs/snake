const Block = require('./Block.js');

module.exports = class Food extends Block{
	constructor (x, y, w, h, color, gameW, gameH){
		super(x, y, w, h, color);
		this.x = Math.round(Math.floor((Math.random() * (gameW-this.w))) / 25) * 25;
		this.y = Math.round(Math.floor((Math.random() * (gameH-this.h))) / 25) * 25;

	}

	getEaten() {
		this.x = Math.round(Math.floor((Math.random() * (gameW-this.w))) / 25) * 25;
		this.y = Math.round(Math.floor((Math.random() * (gameH-this.h))) / 25) * 25;
	}



}