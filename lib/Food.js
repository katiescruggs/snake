const Block = require('./Block.js');
const { blockSize } = require('./gameConfig.js');

var foodImage = require('./images/apple2.png');

module.exports = class Food extends Block {
  constructor (x, y, w, h, color, gameW, gameH){
    super(x, y, w, h, color);
    this.w = blockSize;
    this.h = blockSize;
    this.gameW = gameW;
    this.gameH = gameH;
    this.foodImage = foodImage;
    this.resetCoordinates();
  }

  resetCoordinates() {
    this.x = Math.round(Math.floor((Math.random() * (this.gameW-this.w))) / blockSize) * blockSize;
    this.y = Math.round(Math.floor((Math.random() * (this.gameH-this.h))) / blockSize) * blockSize;
  }
};