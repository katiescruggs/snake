const Block = require('./Block.js');
const { blockSize } = require('./gameConfig.js');

module.exports = class Food extends Block {
  constructor (x, y, w, h, color, gameW, gameH){
    super(x, y, w, h, color);
    this.w = blockSize;
    this.h = blockSize;
    this.gameW = gameW;
    this.gameH = gameH;
    // this.foodImage = foodImage;
    this.resetCoordinates();
    this.currentFruitIndex;
  }

  draw(context) {
  	let fruitImages = [
  		document.getElementById('apple'),
  		document.getElementById('orange'),
  		document.getElementById('pear'),
  		document.getElementById('strawberry'),
  	]
  	let image = fruitImages[this.currentFruitIndex];
    context.drawImage(image, this.x, this.y, this.w, this.h);
  }

  resetCoordinates() {
    this.x = Math.round(Math.floor((Math.random() * (this.gameW-this.w))) / blockSize) * blockSize;
    this.y = Math.round(Math.floor((Math.random() * (this.gameH-this.h))) / blockSize) * blockSize;
    this.currentFruitIndex = Math.floor(Math.random() * 4);
  }
};