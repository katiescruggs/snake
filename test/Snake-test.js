const chai = require('chai');
const assert = chai.assert;
const Snake = require('../lib/Snake.js');
const Game = require('../lib/Game.js');
const Food = require('../lib/Food.js');
const Block = require('../lib/Block.js');

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

  it('should have a body that is an array', function() {
    var snake = new Snake (600, 600);
    assert.isArray(snake.body)
  })

  it('should grow when it eats', function () {
    var snake = new Snake (600, 600);
    assert.equal(snake.body.length, 3)
    snake.grow(1)
    assert.equal(snake.body.length, 4)

  })

  it.skip('should eat when it hits food', function () {
    var snake = new Snake (600, 600);
    var food = new Food(10, 10, 30, 30, 'red', 600, 600, 'image')
    let segment = snake.body[0]

    assert.equal(snake.eat(), false);
    snake.body[0].x === 10;
    assert.equal(snake.eat(), true);

  });

  it.skip('should be able to move left when left arrow is pressed', function () {
    var snake = new Snake (600, 600);
    snake.changeDirection(37)
    assert.equal(snake.x, 270)
  });

});