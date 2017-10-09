module.exports = class Block {
  constructor(x, y, w, h, color = 'green', direction = 'left') {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.color = color;
    this.direction = direction;
  }

  draw(context, img) {
    context.drawImage(img, this.x, this.y, this.w, this.h);
  }

  // drawHeadUpDown(context, img) {
  //   context.drawImage(img, this.x -10, this.y - 30, 40, 60);
  // }

  // drawHeadLeftRight(context, img) {
  //   context.drawImage(img, this.x -30, this.y - 10, 60, 40);
  // }

  // drawTailUpDown(context, img) {
  //   context.drawImage(img, this.x, this.y, 20, 40);
  // }

  // drawTailLeftRight(context, img) {
  //   context.drawImage(img, this.x, this.y, 40, 20);
  // }
};