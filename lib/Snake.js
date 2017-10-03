const Block = require('./Block.js');

module.exports = class Snake {
	constructor (gameW, gameH) {
		this.x = gameW / 2;
		this.y = gameH / 2;

		this.body = [new Block (this.x, this.y, 20, 20), 
			new Block(this.x + 25, this.y, 20, 20),
			new Block (this.x + 50, this.y, 20, 20) ];

	}

	move () {
		//tail off 
		this.body.pop();
		// new head on 

		this.x -= 25;
		this.body.unshift(new Block (this.x, this.y, 20, 20))


	}

}