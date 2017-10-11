const chai = require('chai');
const assert = chai.assert;
const Game = require('../lib/Game.js');
global.localStorage = {
  getItem: function(){
  console.log('getItem');
  },
  setItem: function(){
    console.log('setItem');
  }}
global.document = {
  getElementById: function() {},
  querySelector: function() {
    return {innerText: 'innerText'};
  }
}

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

  it('score increases when raiseScore is called', function() {
    var game = new Game('context', 600, 600);
    game.raiseScore();
    assert.equal(game.score, 1);

  });

});