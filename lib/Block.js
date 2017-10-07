module.exports = class Block {
	constructor(x, y, w, h, color = 'green') {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color;
		this.direction = 'left';
	}

	draw(context, img) {
		context.drawImage(img, this.x, this.y, this.w, this.h);
	}

}