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

    this.caterImages = [
      document.getElementById('cater-head-vertical'),     //0
      document.getElementById('cater-head-horizontal'),		//1	
      document.getElementById('cater-legs-vertical1'),		//2	
      document.getElementById('cater-legs-horizontal1'), //3
      document.getElementById('cater-legs-vertical2'),	 //4
      document.getElementById('cater-legs-horizontal2'), //5

      document.getElementById('cater-tail-up'), 		//6
      document.getElementById('cater-tail-down'),		//7	
      document.getElementById('cater-tail-left'),		//8	
      document.getElementById('cater-tail-right'),  //9

      [ document.getElementById('cater-body1'),  //10 - 0
      	document.getElementById('cater-body2'),	 //10 - 1
      	document.getElementById('cater-body3'),	 //10 - 2
      	document.getElementById('cater-body4'),	 //10 - 3
      	document.getElementById('cater-body5'),	 //10 - 4
      ]
  
    ];

    this.body = [
      new Block (this.x, this.y, blockSize, blockSize), 
      new Block(this.x + blockSize * 1, this.y, blockSize, blockSize),
      new Block (this.x + blockSize * 2, this.y, blockSize, blockSize) 
    ];
  }

   drawBody(context) {

    if(this.body[1].direction === 'up' || this.body[1].direction === 'down') {
    	this.body[1].draw(context, this.caterImages[4]);
    } else {
    	this.body[1].draw(context, this.caterImages[5]);
    }
   

    for(let i = 2; i < this.body.length - 1; i++) {
     	this.body[i].draw(context, this.caterImages[10][( i % 5 )]);
    }

    if(this.body[this.body.length-1].direction === 'up' || this.body[this.body.length-1].direction === 'down') {
      this.body[this.body.length-1].draw(context, this.caterImages[2]);
    } else {
      this.body[this.body.length-1].draw(context, this.caterImages[3]);
    }

    if(this.body[0].direction === 'up' || this.body[0].direction === 'down') {
      this.body[0].draw(context, this.caterImages[0]);
    } else {
      this.body[0].draw(context, this.caterImages[1]);
    }

  } 

  eat(food) {
    if(this.body[0].x === food.x && this.body[0].y === food.y) {
      return true;
    }
    if(this.body[1].x === food.x && this.body[1].y === food.y) {
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

  grow() {
    let direction = this.currentDirection();
    //this.body.unshift(new Block (this.body[0].x + this.changeX, this.body[0].y + this.changeY, blockSize, blockSize, 'green', direction));
    let tail = this.body[this.body.length - 1];
    this.body.push(new Block(tail.x, tail.y, blockSize, blockSize, 'green', tail.direction));
  }

  changeDirection(keyCode) {
    let direction = this.currentDirection();

    if(keyCode === 37) {
      if(direction === 'up' || direction === 'down') {
        this.changeX = -blockSize;
        this.changeY = 0;
        this.body[0].direction = 'left';
      }
    } else if(keyCode === 39) {
      if(direction === 'up' || direction === 'down') {
        this.changeX = blockSize;
        this.changeY = 0;
        this.body[0].direction = 'right';
      }
    } else if(keyCode === 38) {
      if(direction === 'left' || direction === 'right') {
        this.changeX = 0;
        this.changeY = -blockSize;
        this.body[0].direction = 'up';
      }
    } else if(keyCode === 40) {
      if(direction === 'left' || direction === 'right') {
        this.changeX = 0;
        this.changeY = blockSize;
        this.body[0].direction = 'down';
      }
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
