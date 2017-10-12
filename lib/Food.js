const Block = require('./Block.js');
const { blockSize } = require('./gameConfig.js');

let snakeArray = [{x: 300, y: 300},
 {x: 330, y: 300}, 
 {x: 360, y: 300}];

module.exports = class Food extends Block {
  constructor (x, y, w, h, color, gameW, gameH){
    super(x, y, w, h, color);
    this.w = blockSize;
    this.h = blockSize;
    this.gameW = gameW;
    this.gameH = gameH;
    this.resetCoordinates(snakeArray);
    this.currentFruitIndex;
  }

  draw(context) {
  	let fruitImages = [
  		document.getElementById('apple'),
  		document.getElementById('strawberry'),
  		document.getElementById('pear'),
  		document.getElementById('orange'),
  	];
  	let image = fruitImages[this.currentFruitIndex];
    context.drawImage(image, this.x, this.y, this.w, this.h);
  }

  resetCoordinates(snakeArray) {
    this.x = Math.round(Math.floor((Math.random() * (this.gameW-this.w))) / blockSize) * blockSize;
    this.y = Math.round(Math.floor((Math.random() * (this.gameH-this.h))) / blockSize) * blockSize;
    this.currentFruitIndex = Math.floor(Math.random() * 4);

    for(var i = 0; i < snakeArray.length; i++ ) {
      if (snakeArray[i].x === this.x && snakeArray[i].y === this.y){
        console.log('FOOD ON SNAKE');
        this.resetCoordinates(snakeArray);
      }
    }
  }
};