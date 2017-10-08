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
      document.getElementById('snake-body-horizontal') //9
    ];

    this.body = [
      new Block (this.x, this.y, 20, 20), 
      new Block(this.x + 25, this.y, 20, 20),
      new Block (this.x + 50, this.y, 20, 20) 
    ];
  }

  currentDirection() {
    if(this.changeX === -25){
      return 'left';
    } else if(this.changeX === 25) {
      return 'right';
    } else if(this.changeY === -25) {
      return 'up';
    } else if(this.changeY === 25) {
      return 'down';
    }
  }

  move() {
    let direction = this.currentDirection();
    this.body.pop();
    this.body.unshift(new Block (this.body[0].x + this.changeX, this.body[0].y + this.changeY, 20, 20, 'green', direction));
  }

  grow() {
    let direction = this.currentDirection();
    this.body.unshift(new Block (this.body[0].x + this.changeX, this.body[0].y + this.changeY, 20, 20, 'green', direction));
  }

  changeDirection(keyCode) {
    let direction = this.currentDirection();

    if(keyCode === 37) {
      if(direction === 'up' || direction === 'down') {
        this.changeX = -25;
        this.changeY = 0;
        this.body[0].direction = 'left';
      }
    } else if(keyCode === 39) {
      if(direction === 'up' || direction === 'down') {
        this.changeX = 25;
        this.changeY = 0;
        this.body[0].direction = 'right';
      }
    } else if(keyCode === 38) {
      if(direction === 'left' || direction === 'right') {
        this.changeX = 0;
        this.changeY = -25;
        this.body[0].direction = 'up';
      }
    } else if(keyCode === 40) {
      if(direction === 'left' || direction === 'right') {
        this.changeX = 0;
        this.changeY = 25;
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
    if (this.body[0].x < 0 || this.body[0].x > this.gameW || this.body[0].y < 0 || this.body[0].y > this.gameH){
      return true;
    }
  }
};
