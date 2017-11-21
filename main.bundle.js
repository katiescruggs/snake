/******/ (function(modules) { // webpackBootstrap
/******/  // The module cache
/******/  var installedModules = {};

/******/  // The require function
/******/  function __webpack_require__(moduleId) {

/******/    // Check if module is in cache
/******/    if(installedModules[moduleId])
/******/      return installedModules[moduleId].exports;

/******/    // Create a new module (and put it into the cache)
/******/    var module = installedModules[moduleId] = {
/******/      exports: {},
/******/      id: moduleId,
/******/      loaded: false
/******/    };

/******/    // Execute the module function
/******/    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/    // Flag the module as loaded
/******/    module.loaded = true;

/******/    // Return the exports of the module
/******/    return module.exports;
/******/  }


/******/  // expose the modules object (__webpack_modules__)
/******/  __webpack_require__.m = modules;

/******/  // expose the module cache
/******/  __webpack_require__.c = installedModules;

/******/  // __webpack_public_path__
/******/  __webpack_require__.p = "";

/******/  // Load entry module and return exports
/******/  return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

  const Game = __webpack_require__(1);
  const Snake = __webpack_require__(2);

  const canvas = document.getElementById('game');
  const context = canvas.getContext('2d');
  let game = new Game(context, canvas.width, canvas.height, document.getElementById('food-img'));

  let instructionScreen = document.getElementById('instruction-screen');
  let gameOverScreen = document.getElementById('game-over-screen');

  window.addEventListener('keydown', function (event) {
    if (event.keyCode === 32 && game.stillPlaying === false) {
      instructionScreen.classList.add('hide');
      resetGame();
    } else if (event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
      game.snake.changeDirection(event.keyCode);
    }
  });

  document.getElementById('easy').addEventListener('click', function () {
    hideStartScreen();
    displayInstructions();
    game.speed = 180;
    game.displayScore();
    drawSnakeAtStart();
  });

  document.getElementById('difficult').addEventListener('click', function () {
    hideStartScreen();
    displayInstructions();
    game.speed = 100;
    game.displayScore();
    drawSnakeAtStart();
  });

  function resetGame() {
    gameOverScreen.classList.add('hide');
    var currentSpeed = game.speed;
    game = new Game(context, canvas.width, canvas.height);
    game.speed = currentSpeed;
    game.startGame();
  }

  document.getElementById('play-again').addEventListener('click', resetGame);

  function displayInstructions() {
    instructionScreen.classList.remove('hide');
  }

  function hideStartScreen() {
    document.getElementById('start-screen').classList.add('hide');
  }

  function drawSnakeAtStart() {
    let snakeStart = new Snake(canvas.width, canvas.height);
    snakeStart.drawBody(context);
  }

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

  const Snake = __webpack_require__(2);
  const Food = __webpack_require__(5);

  module.exports = class Game {
    constructor(context, width, height, foodImage) {
      this.context = context;
      this.width = width;
      this.height = height;
      this.snake = new Snake(this.width, this.height);
      this.food = new Food("x", "y", 30, 30, 'red', this.width, this.height, foodImage);
      this.score = 0;
      this.highScore = parseInt(localStorage.getItem('highScore')) || 0;
      this.stillPlaying = false;
      this.speed = 180;
    }

    collisionDetection() {
      if (this.snake.hitWall()) {
        this.stillPlaying = false;
      }
      if (this.snake.isCollidingWith(this.snake.body[0])) {
        this.stillPlaying = false;
      }
    }

    checkFoodConsumption() {
      if (this.snake.eat(this.food)) {
        this.snake.grow(this.food.currentFruitIndex + 1);
        this.food.resetCoordinates(this.snake.body);
        this.raiseScore();
      }
    }

    gameLoop() {
      this.context.clearRect(0, 0, this.width, this.height);
      this.collisionDetection();
      this.checkFoodConsumption();

      if (this.stillPlaying) {
        this.animate();
        setTimeout(this.gameLoop.bind(this), this.speed);
      } else {
        this.endGame();
      }
    }

    animate() {
      this.snake.move();
      this.snake.drawBody(this.context);
      this.food.draw(this.context);
    }

    endGame() {
      this.context.clearRect(0, 0, this.width, this.height);
      this.snake.drawBody(this.context);
      document.getElementById('game-over-screen').classList.remove('hide');
      this.endDisplayScore();
    }

    displayScore() {
      document.querySelector('.score').innerText = this.score;
      document.querySelector('.high-score').innerText = this.highScore;
    }

    endDisplayScore() {
      document.querySelector('.end-score').innerText = this.score;
      document.querySelector('.end-high-score').innerText = this.highScore;
    }

    startGame() {
      this.stillPlaying = true;
      this.gameLoop();
    }

    raiseScore() {
      this.score++;
      document.querySelector('.score').innerText = this.score;

      if (this.score > this.highScore) {
        this.highScore = this.score;
        document.querySelector('.high-score-message').innerHTML = "<p> <img src = './lib/images/butterfly.png' class = 'score-icon-2' alt ='high score trophy image'/> <strong>You set a high score!</strong></p>";
        let highScoreStr = this.highScore.toString();
        localStorage.setItem('highScore', highScoreStr);
      }
    }
  };

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

  const Block = __webpack_require__(3);
  const { blockSize } = __webpack_require__(4);

  module.exports = class Snake {
    constructor(gameW, gameH) {
      this.x = gameW / 2;
      this.y = gameH / 2;
      this.changeX = -blockSize;
      this.changeY = 0;
      this.gameW = gameW;
      this.gameH = gameH;
      this.headW = 75;
      this.headH = 40;
      this.tailW = 20;
      this.tailH = 62;

      this.body = [new Block(this.x, this.y, blockSize, blockSize), new Block(this.x + blockSize * 1, this.y, blockSize, blockSize), new Block(this.x + blockSize * 2, this.y, blockSize, blockSize)];
    }

    drawBody(context) {
      const caterImages = [document.getElementById('cater-head-vertical'), document.getElementById('cater-head-horizontal'), document.getElementById('cater-legs-vertical1'), document.getElementById('cater-legs-horizontal1'), document.getElementById('cater-legs-vertical2'), document.getElementById('cater-legs-horizontal2'), document.getElementById('cater-tail-up'), document.getElementById('cater-tail-down'), document.getElementById('cater-tail-left'), document.getElementById('cater-tail-right'), [document.getElementById('cater-body1'), document.getElementById('cater-body2'), document.getElementById('cater-body3'), document.getElementById('cater-body4'), document.getElementById('cater-body5')]];

      if (this.body[1].direction === 'up' || this.body[1].direction === 'down') {
        this.body[1].draw(context, caterImages[4]);
      } else {
        this.body[1].draw(context, caterImages[5]);
      }

      for (let i = 2; i < this.body.length - 1; i++) {
        this.body[i].draw(context, caterImages[10][i % 5]);
      }

      if (this.body[this.body.length - 1].direction === 'up' || this.body[this.body.length - 1].direction === 'down') {
        this.body[this.body.length - 1].draw(context, caterImages[2]);
      } else {
        this.body[this.body.length - 1].draw(context, caterImages[3]);
      }

      if (this.body[0].direction === 'up' || this.body[0].direction === 'down') {
        this.body[0].draw(context, caterImages[0]);
      } else {
        this.body[0].draw(context, caterImages[1]);
      }
    }

    eat(food) {
      if (this.body[0].x === food.x && this.body[0].y === food.y) {
        return true;
      }
    }

    currentDirection() {
      if (this.changeX === -blockSize) {
        return 'left';
      } else if (this.changeX === blockSize) {
        return 'right';
      } else if (this.changeY === -blockSize) {
        return 'up';
      } else if (this.changeY === blockSize) {
        return 'down';
      }
    }

    move() {
      let direction = this.currentDirection();
      this.body.pop();
      this.body.unshift(new Block(this.body[0].x + this.changeX, this.body[0].y + this.changeY, blockSize, blockSize, 'green', direction));
    }

    grow(number) {
      let tail = this.body[this.body.length - 1];
      for (var i = 0; i < number; i++) {
        this.body.push(new Block(tail.x, tail.y, blockSize, blockSize, 'green', tail.direction));
      }
    }

    changeDirection(keyCode) {
      const keyCodeGuide = {
        37: {
          direction: 'left',
          changeX: -blockSize,
          changeY: 0
        },
        38: {
          direction: 'up',
          changeX: 0,
          changeY: -blockSize
        },
        39: {
          direction: 'right',
          changeX: blockSize,
          changeY: 0
        },
        40: {
          direction: 'down',
          changeX: 0,
          changeY: blockSize
        }
      };

      let futureHead = {
        x: this.body[0].x + keyCodeGuide[keyCode].changeX,
        y: this.body[0].y + keyCodeGuide[keyCode].changeY
      };

      if (!this.isCollidingWith(futureHead)) {
        this.body[0].direction = keyCodeGuide[keyCode].direction;
        this.changeX = keyCodeGuide[keyCode].changeX;
        this.changeY = keyCodeGuide[keyCode].changeY;
      }
    }

    isCollidingWith(collider) {
      for (var i = 1; i < this.body.length; i++) {
        if (this.body[i].x === collider.x && this.body[i].y === collider.y) {
          return true;
        }
      }
    }

    hitWall() {
      if (this.body[0].x < 0 || this.body[0].x > this.gameW - blockSize || this.body[0].y < 0 || this.body[0].y > this.gameH - blockSize) {
        return true;
      }
    }
  };

/***/ }),
/* 3 */
/***/ (function(module, exports) {

  module.exports = class Block {
    constructor(x, y, w, h, color = 'green', direction = 'left') {
      this.x = x;
      this.y = y;
      this.w = w;
      this.h = h;
      this.color = color;
      this.direction = direction;
    }

    draw(context, img) {
      context.drawImage(img, this.x, this.y, this.w, this.h);
    }
  };

/***/ }),
/* 4 */
/***/ (function(module, exports) {

  module.exports = {
    blockSize: 30
  };

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

  const Block = __webpack_require__(3);
  const { blockSize } = __webpack_require__(4);

  let snakeArray = [{ x: 300, y: 300 }, { x: 330, y: 300 }, { x: 360, y: 300 }];

  module.exports = class Food extends Block {
    constructor(x, y, w, h, color, gameW, gameH) {
      super(x, y, w, h, color);
      this.w = blockSize;
      this.h = blockSize;
      this.gameW = gameW;
      this.gameH = gameH;
      this.resetCoordinates(snakeArray);
      this.currentFruitIndex;
    }

    draw(context) {
      let fruitImages = [document.getElementById('apple'), document.getElementById('strawberry'), document.getElementById('pear'), document.getElementById('orange')];
      let image = fruitImages[this.currentFruitIndex];
      context.drawImage(image, this.x, this.y, this.w, this.h);
    }

    resetCoordinates(snakeArray) {
      this.x = Math.round(Math.floor(Math.random() * (this.gameW - this.w)) / blockSize) * blockSize;
      this.y = Math.round(Math.floor(Math.random() * (this.gameH - this.h)) / blockSize) * blockSize;
      this.currentFruitIndex = Math.floor(Math.random() * 4);

      for (var i = 0; i < snakeArray.length; i++) {
        if (snakeArray[i].x === this.x && snakeArray[i].y === this.y) {
          this.resetCoordinates(snakeArray);
        }
      }
    }
  };

/***/ })
/******/ ]);