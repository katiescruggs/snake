const chai = require('chai');
const assert = chai.assert;
const Block = require('../lib/Block.js');

describe('Block', function() {

  //constructor function
  it('should take in x, y, w h, and color', function() {
    var block = new Block(10, 20, 30, 40, 'red');

    assert.equal(block.x, 10);
    assert.equal(block.y, 20);
    assert.equal(block.w, 30);
    assert.equal(block.h, 40);
    assert.equal(block.color, 'red');
  });

  //constructor function default
  it('should have a default color of green', function() {
    var block = new Block(10, 20, 30, 40);

    assert.equal(block.color, 'green');
  });

  //draw function
  it('should be able to draw itself', function() {
    var block = new Block(10, 10, 20, 20);
    block.draw();

    //I'm not sure how to test if the draw function executes
    assert.equal()
  });


});