const Block = require('./Block.js');
const { blockSize } = require('./gameConfig.js');

module.exports = class Snake {
  constructor(gameW, gameH) {
    this.x = gameW / 2;
    this.y = gameH / 2;
    this.changeX = -blockSize;
    this.changeY = 0;
    this.gameW = gameW;
    this.gameH = gameH;
    this.headW = 75;
    this.headH = 40;
    this.tailW = 20;
    this.tailH = 62;

    this.body = [
      new Block (this.x, this.y, blockSize, blockSize), 
      new Block(this.x + blockSize * 1, this.y, blockSize, blockSize),
      new Block (this.x + blockSize * 2, this.y, blockSize, blockSize) 
    ];
  }

   drawBody(context) {
   	const caterImages = [
      document.getElementById('cater-head-vertical'),     
      document.getElementById('cater-head-horizontal'),	
      document.getElementById('cater-legs-vertical1'),		
      document.getElementById('cater-legs-horizontal1'), 
      document.getElementById('cater-legs-vertical2'),	 
      document.getElementById('cater-legs-horizontal2'), 

      document.getElementById('cater-tail-up'), 		
      document.getElementById('cater-tail-down'),		
      document.getElementById('cater-tail-left'),		
      document.getElementById('cater-tail-right'),  

      [ document.getElementById('cater-body1'),  
      	document.getElementById('cater-body2'),	 
      	document.getElementById('cater-body3'),	 
      	document.getElementById('cater-body4'),	 
      	document.getElementById('cater-body5'),	 
      ]
    ];

    if(this.body[1].direction === 'up' || this.body[1].direction === 'down') {
    	this.body[1].draw(context, caterImages[4]);
    } else {
    	this.body[1].draw(context, caterImages[5]);
    }
   

    for(let i = 2; i < this.body.length - 1; i++) {
     	this.body[i].draw(context, caterImages[10][( i % 5 )]);
    }

    if(this.body[this.body.length-1].direction === 'up' || this.body[this.body.length-1].direction === 'down') {
      this.body[this.body.length-1].draw(context, caterImages[2]);
    } else {
      this.body[this.body.length-1].draw(context, caterImages[3]);
    }

    if(this.body[0].direction === 'up' || this.body[0].direction === 'down') {
      this.body[0].draw(context, caterImages[0]);
    } else {
      this.body[0].draw(context, caterImages[1]);
    }
  } 

  eat(food) {
    if(this.body[0].x === food.x && this.body[0].y === food.y) {
      return true;
    }
  }

  currentDirection() {
    if(this.changeX === -blockSize){
      return 'left';
    } else if(this.changeX === blockSize) {
      return 'right';
    } else if(this.changeY === -blockSize) {
      return 'up';
    } else if(this.changeY === blockSize) {
      return 'down';
    }
  }

  move() {
    let direction = this.currentDirection();

	    this.body.pop();
	    this.body.unshift(new Block (this.body[0].x + this.changeX, this.body[0].y + this.changeY, blockSize, blockSize, 'green', direction));
  }

  grow(number) {
    // let direction = this.currentDirection();

	    let tail = this.body[this.body.length - 1];
    for(var i = -1; i < number; i++) {
	    this.body.push(new Block(tail.x, tail.y, blockSize, blockSize, 'green', tail.direction));
    }
    console.log(this.body.length);
  }

  changeDirection(keyCode) {
    let direction = this.currentDirection();

    const keyCodeGuide = {
    	37: {
    		direction: 'left',
    		changeX: -blockSize,
    		changeY: 0
    	},
    	38: {
    		direction: 'up',
    		changeX: 0,
    		changeY: -blockSize
    	},
    	39: {
    		direction: 'right',
    		changeX: blockSize,
    		changeY: 0
    	},
    	40: {
    		direction: 'down',
    		changeX: 0,
    		changeY: blockSize
    	}
    };

    let futureHead = {
    	x: this.body[0].x + keyCodeGuide[keyCode].changeX,
    	y: this.body[0].y + keyCodeGuide[keyCode].changeY
    }

    if(!this.onSnakeCoordinates(futureHead)) {
    	this.body[0].direction = keyCodeGuide[keyCode].direction;
    	this.changeX = keyCodeGuide[keyCode].changeX;
    	this.changeY = keyCodeGuide[keyCode].changeY;
    }
  }

  onSnakeCoordinates(collider) {
    for (var i = 1; i < this.body.length; i++ ) {
      if (this.body[i].x === collider.x && this.body[i].y === collider.y){
        console.log('HITTING OBJECT');
        return true;
      }
    }
  }

  hitWall() {
    if (
    	this.body[0].x < 0 || 
    	this.body[0].x > (this.gameW-blockSize) || 
    	this.body[0].y < 0 || 
    	this.body[0].y > (this.gameH-blockSize)
    ){
      return true;
    }
  }
};
