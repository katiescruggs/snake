const chai = require('chai');
const assert = chai.assert;
const Food = require('../lib/Food.js');

describe('Food', function() {
  it('should take in gameW and gameH', function() {
    var food = new Food(10, 10, 10, 10, 'red', 50, 60);

    assert.equal(food.gameW, 50);
    assert.equal(food.gameH, 60);
  });

  it('should have a random number for x and y coordinates', function() {
    var food = new Food(10, 10, 10, 10, 'red', 50, 60);


//not sure how to test if the # is greater than 0 and less than canvas.width
//also need to check if # is divisible by 25
    // assert.equal(food.x, )

  });

  it('should check if it is currently being eaten', function() {
    var food = new Food(10, 10, 20, 20, 'red', 600, 600);
    food.x = 10;
    food.y = 10;

    assert.equal(food.checkEaten(10, 10, 30, 30), true);
    assert.equal(food.checkEaten(30, 30, 10, 10), true);
    assert.equal(food.checkEaten(50, 50, 60, 40), undefined);
    assert.equal(food.checkEaten(100, 300, 500, 200), undefined);
  });

  it('should set new x and y coordinates if it has been eaten', function() {

//not sure how to check for these random numbers

  });
});