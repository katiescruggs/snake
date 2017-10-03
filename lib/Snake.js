const Block = require('./Block.js');

module.exports = class Snake {
	constructor () {
		this.body = [new Block (300, 300, 20, 20), 
			new Block(330, 300, 20, 20),
			new Block (360, 300, 20, 20) ];

	}

	move () {
		//tail off 
		this.body.pop();
		// new head on 
		this.body.unshift(new Block (100, 300, 20, 20))


	}

}