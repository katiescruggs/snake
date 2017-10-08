const Game = require('./Game.js');
const Snake = require('./Snake.js');


const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const game = new Game(context, canvas.width, canvas.height);
let easyButton = document.getElementById('easy');
let difficultButton = document.getElementById('difficult');
let startScreen = document.getElementById('start-screen');

canvas.focus();
game.startGame();

window.addEventListener('keydown', function(event) {
  game.snake.changeDirection(event.keyCode);
});

easyButton.addEventListener('click', function() {
  
// var closestElem = getClosest(this.parentNode, '#start-screen');

// console.log(closestElem)

// getClosest(elem.parentNode, '#sample-id');

  // getClosest(elem.parentNode, '#sample-id'
  // console.log(this.parentElement)

  startScreen.classList.add('hide');

  // this.parentNode.style.display = 'none';

  // $(this).parents(':eq(2)').style.display = 'none'

});

difficultButton.addEventListener('click', function() {
  console.log('difficult button clicked')
  // startScreen.classList.add('hide');

  this.parentNode.style.display = 'none';

});


