const chai = require('chai');
const assert = chai.assert;
const Game = require('../lib/Game.js');
global.localStorage = {}

describe('Game', function() {

//constructor testing
  it('should take in its parameters', function() {
    var game = new Game('one', 'two', 'three', 'foodImage');
    assert.equal(game.context, 'one');
    assert.equal(game.width, 'two');
    assert.equal(game.height, 'three');
    assert.equal(game.score, 0);
    assert.equal(game.highScore, 0);
    assert.equal(game.stillPlaying, true);

    assert.equal(typeof(game.snake), 'object');
    assert.equal(typeof(game.food), 'object');
  });

  it('should have a gameLoop function', function() {
    var game = new Game('one', 'two', 'three', 'foodImage');
    assert.equal(typeof(game.gameLoop), 'function');
  });

  // it.skip('should stop the gameLoop if the snake dies', function() {
  //   var game = new Game('one', 'two', 'three', 'foodImage');
  //   //game.snake.onSnakeCoordinates(game.snake.body[0]) = true;

  //   game.gameLoop();
  //   assert.equal(game.stillPlaying, false);
  // });


//gameLoop

//displayScore

//endDisplayScore

//startGame

//raiseScore

});