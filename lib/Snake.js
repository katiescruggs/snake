const Block = require('./Block.js');

module.exports = class Snake {
	constructor(gameW, gameH) {
		
		this.x = gameW / 2;
		this.y = gameH / 2;
		this.changeX = -25;
		this.changeY = 0;
		this.gameW = gameW;
		this.gameH = gameH;

		this.headW = 75;
		this.headH = 40;
	
		this.tailW = 20;
		this.tailH = 62;

		this.snakeImages = [
			document.getElementById('snake-head-up'),     //0
			document.getElementById('snake-head-down'),		//1	
			document.getElementById('snake-head-left'),		//2	
			document.getElementById('snake-head-right'),  //3
			document.getElementById('snake-tail-up'), 		//4
			document.getElementById('snake-tail-down'),		//5	
			document.getElementById('snake-tail-left'),		//6	
			document.getElementById('snake-tail-right'),  //7
			document.getElementById('snake-body-vertical'), //8
			document.getElementById('snake-body-hortizontal') //9
		];

		this.body = [
			new Block (this.x, this.y, 20, 20), 
			new Block(this.x + 25, this.y, 20, 20),
			new Block (this.x + 25, this.y, 20, 20) ];
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
		if(direction === 37) {
			this.changeX = -25;
			this.changeY = 0;

			this.body[0].direction = 'left';

		} else if(direction === 39) {
			this.changeX = 25;
			this.changeY = 0;

			this.body[0].direction = 'right';

		} else if(direction === 38) {
			this.changeX = 0;
			this.changeY = -25;

			this.body[0].direction = 'up';

		} else if(direction === 40) {
			this.changeX = 0;
			this.changeY = 25;

			this.body[0].direction = 'down';
		}

		this.move();


	}

	onSnakeCoordinates(collider) {
		for (var i = 1; i < this.body.length; i++ ) {
			if (this.body[i].x === collider.x && this.body[i].y === collider.y){
				console.log('HITTING OBJECT')
				return true;
			}
		}

	}

	hitWall() {
		if (this.body[0].x < 0 || this.body[0].x > this.gameW || this.body[0].y < 0 || this.body[0].y > this.gameH){


			console.log(this.body)
			return true;
		}

	}



}