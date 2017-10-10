const chai = require('chai');
const assert = chai.assert;
const Block = require('../lib/Block.js');

describe('Block', function() {

  it('should take in x, y, w h, color, and direction', function() {
    var block = new Block(10, 20, 30, 40, 'red', 'up');

    assert.equal(block.x, 10);
    assert.equal(block.y, 20);
    assert.equal(block.w, 30);
    assert.equal(block.h, 40);
    assert.equal(block.color, 'red');
    assert.equal(block.direction, 'up');
  });

  it('should have a default color of green', function() {
    var block = new Block(10, 20, 30, 40);

    assert.equal(block.color, 'green');
  });

  it('should have a default direction of left', function() {
    var block = new Block(10, 10, 20, 20);
    assert.equal(block.direction, 'left');
  });

  it('should have a draw function', function() {
    var block = new Block(10, 20, 30, 40, 'red', 'up');
    assert.equal(typeof(block.draw), 'function');
  });

});