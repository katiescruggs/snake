const Game = require('./Game.js');


const canvas = document.getElementById('game');
const context = canvas.getContext('2d');
const game = new Game(context, canvas.width, canvas.height);
game.startGame();
console.log(game)

