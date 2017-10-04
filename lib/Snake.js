const Block = require('./Block.js');

module.exports = class Snake {
	constructor(gameW, gameH) {
		this.x = gameW / 2;
		this.y = gameH / 2;
		this.changeX = -25;
		this.changeY = 0;

		this.body = [new Block (this.x, this.y, 20, 20), 
			new Block(this.x + 25, this.y, 20, 20),
			new Block (this.x + 50, this.y, 20, 20) ];

	}

	move() {
		//tail off 
		this.body.pop();

		// new head on 
		this.body.unshift(new Block (this.body[0].x + this.changeX, this.body[0].y + this.changeY, 20, 20))
	}

	grow() {
		this.body.unshift(new Block (this.body[0].x + this.changeX, this.body[0].y + this.changeY, 20, 20))
	}

	changeDirection(direction) {
		if(direction === 'left') {
			this.changeX = -25;
			this.changeY = 0;
		} else if(direction === 'right') {
			this.changeX = 25;
			this.changeY = 0;
		} else if(direction === 'up') {
			this.changeX = 0;
			this.changeY = -25;
		} else {
			this.changeX = 0;
			this.changeY = 25;
		}

		this.move();


	}

}