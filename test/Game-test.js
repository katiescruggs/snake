const chai = require('chai');
const assert = chai.assert;
const Game = require('../lib/Game.js');
const Snake = require('../lib/Snake.js');
global.localStorage = {
  getItem: function(){  },
  setItem: function(){  }
}
global.document = {
  getElementById: function() { },
  querySelector: function() {
    return {innerText: 'innerText'};
  }
}

describe('Game', function() {
  it('should be an object', function() {
    var game = new Game('context', 600, 600);
    assert.equal(typeof(game), 'object');
  });


  it('should take in its parameters', function() {
    var game = new Game('context', 600, 600);
    assert.equal(game.context, 'context');
    assert.equal(game.width, 600);
    assert.equal(game.height, 600);
    assert.equal(typeof(game.snake), 'object');
    assert.equal(typeof(game.food), 'object');
    assert.equal(game.score, 0);
    assert.equal(game.highScore, 0);
    assert.equal(game.stillPlaying, true);
    assert.equal(game.speed, 180);
  });

  it('should have a gameLoop function', function() {
    var game = new Game('context', 600, 600);
        assert.equal(typeof(game.gameLoop), 'function');
  });

  it('score increases when raiseScore is called', function() {
    var game = new Game('context', 600, 600);
    assert.equal(game.score, 0);
    game.raiseScore();
    assert.equal(game.score, 1);
  });

  it('should set new high score if the current score is higher', function() {
    var game = new Game('context', 600, 600);
    assert.equal(game.highScore, 0);
    game.score = 99;
    game.raiseScore();
    assert.equal(game.highScore, 100);
  });

  it('should stop the game loop if the snake dies', function() {
    var game = new Game('context', 600, 600);
    game.context = {
      clearRect: function() {},
      drawImage: function() {}
    };
    assert.equal(game.stillPlaying, true);
    
    game.snake.body[0].x = -100;
    game.collisionDetection();

    assert.equal(game.stillPlaying, false);
  });

  

});