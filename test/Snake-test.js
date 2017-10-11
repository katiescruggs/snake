const chai = require('chai');
const assert = chai.assert;
const Snake = require('../lib/Snake.js');

describe('Snake', function() {

  it('should be an object', function() {
    var snake = new Snake (600, 600);
    assert.equal(typeof(snake), "object")
  });

  it('should start in the middle of the screen', function(){
    var snake = new Snake (600, 600);
    assert.equal(snake.x, 300);
    assert.equal(snake.y, 300);

  });

  it('should start with a body of three pieces', function () {
    var snake = new Snake (600, 600);
    assert.equal(snake.body.length, 3)

  });

  it('should grow when it eats', function () {
    var snake = new Snake (600, 600);
    assert.equal(snake.body.length, 3)
    snake.grow(1)
    assert.equal(snake.body.length, 5)

  })

});