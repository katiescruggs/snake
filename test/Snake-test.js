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
  });

  it('should change x and y coordinates when it moves', function() {
    var snake = new Snake (600, 600);
    var oldBodyHead = snake.body[0];

    snake.move();
    assert.equal(oldBodyHead === snake.body[0], false);
  });

  it('should grow when it eats', function () {
    var snake = new Snake (600, 600);
    assert.equal(snake.body.length, 3)
    snake.grow(1)
    assert.equal(snake.body.length, 4)
  });

  it('should eat when it hits food', function () {
    var snake = new Snake (600, 600);
    var food = new Food(10, 10, 30, 30, 'red', 600, 600, 'image');

    assert.equal(snake.eat(food), undefined);

    snake.body[0].x = 10;
    snake.body[0].y = 10;
    food.x = 10;
    food.y = 10;

    assert.equal(snake.eat(food), true);
  });

  it('should be able to move based on key codes from arrow keys', function () {
    var snake = new Snake (600, 600);
    snake.changeDirection(37);
    assert.equal(snake.currentDirection(), 'left');

    snake.move();

    snake.changeDirection(40);
    assert.equal(snake.currentDirection(), 'down');

    snake.move();

    snake.changeDirection(39);
    assert.equal(snake.currentDirection(), 'right');

    snake.move();

    snake.changeDirection(38);
    assert.equal(snake.currentDirection(), 'up');
  });

  it('should prevent user from turning backward', function() {
    var snake = new Snake(600, 600);
   
    snake.changeDirection(37);
    assert.equal(snake.currentDirection(), 'left');

    snake.changeDirection(39);
    assert.equal(snake.currentDirection(), 'left');
  });

  it('should return true if crashing into itself', function() {
    var snake = new Snake(600, 600);

    var collider = {x: 0, y: 0};
    assert.equal(snake.isCollidingWith(collider), undefined);

    collider = {x: 330, y: 300};
    assert.equal(snake.isCollidingWith(collider), true);
  });

  it('should return true if it hits the wall', function() {
    var snake = new Snake(600, 600);

    assert.equal(snake.hitWall(), undefined);

    snake.body[0].x = -10;
    assert.equal(snake.hitWall(), true);

    snake.body[0].x = 650;
    assert.equal(snake.hitWall(), true);


    snake.body[0].x = 300;
    snake.body[0].y = -10;
    assert.equal(snake.hitWall(), true);

    snake.body[0].y = 650;
    assert.equal(snake.hitWall(), true);
  });
});