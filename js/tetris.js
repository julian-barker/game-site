'use strict';


// shortcut functions for document methods
function $(selector) { return document.querySelector(selector); }
function $$(selector) { return document.querySelectorAll(selector); }
function _(tag) { return document.createElement(tag); }


// Initialize global variables

// nested 2d array (10x24)
const gameSpace = new Array(24).fill(0);
for (let i in gameSpace) {
  gameSpace[i] = new Array(10).fill(0);
}

let score = 0;
let paused = false;
let intervalId; // used to stop setInterval
let activePiece; // used to call translate left/right with event listener

window.addEventListener('keydown', function (event) {
  if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault();
  }
  if (event.key === ' ') {
    paused = !paused;
  }
  if (paused === true) return;
  if (event.key === 'ArrowUp') {
    activePiece.rotate();
  } else {
    activePiece.translate(event.key);
  }
});

// begins the game (for testing)
playButton();


// starts running the game by calling nextPiece
function startTetris() {
  score = 0;
  paused = false;
  console.log(gameSpace);
  nextPiece();
  // console.log('done', gameSpace);
}

// Calls new piece and begins dropping it using translate method with setInterval
function nextPiece() {
  activePiece = newPiece();
  console.log('new piece', activePiece);
  console.log('Dropping next piece');
  // setInterval returns the intervalId, used to cancel it later
  intervalId = setInterval(function () {
    activePiece.translate('ArrowDown');
  }, 300);
  console.log('intervalId = ' + intervalId);
}

// Creates a new piece using RNG to randomly select one of the seven piece constructors
function newPiece() {
  console.log('Creating new piece...');
  let num = Math.floor(Math.random() * 7);
  switch (num) {
    case 1:
      return new J();
    case 2:
      return new L();
    case 3:
      return new O();
    case 4:
      return new S();
    case 5:
      return new T();
    case 6:
      return new Z();
    default:
      return new I();
  }
}

function endGame() {
  paused = true;
  const container = $('#canvas-container');

  const popup = _('div');
  const h2 = _('h2');
  const h3 = _('h3');
  const input = _('input');
  const btn = _('button');

  popup.id = 'popup';
  h2.textContent = `Score: ${score}`;
  h3.textContent = 'Enter Initials:';
  input.id = 'initials';
  input.type = 'text';
  btn.addEventListener('click', submitScore);
  btn.textContent = 'Submit';

  popup.append(h2, h3, input, btn);
  container.prepend(popup);
  for (let y of gameSpace) {
    y.fill(0);
  }
  draw();
  console.log(gameSpace);
}

function submitScore() {
  let scores;
  let maybeStored = localStorage.getItem('scores');
  if (maybeStored) {
    scores = JSON.parse(maybeStored);
  } else {
    scores = [];
  }
  const initials = $('#initials').value;

  scores.push({initials, score});
  scores.sort((a, b) => b.score - a.score);
  localStorage['scores'] = JSON.stringify(scores);
  const popup = $('#popup');
  console.log(maybeStored);
  popup.remove();
  playButton();
}

function playButton() {
  const container = $('#canvas-container');
  const play = _('button');
  play.textContent = 'Play';
  play.id = 'playButton';
  container.appendChild(play);
  play.addEventListener('click', playHandler);
}

function playHandler() {
  let playButton = $('#playButton');
  playButton.remove();
  startTetris();
}

/////////////////////////////////
// Piece constructor functions //

// Overall Piece constructor function that holds several default methods and properties
// It is instantiated in individual piece constructors with Piece.call(this)
function Piece() {
  this.state = 0;
  this.coords = [];
  this.origin = [5, 3];

  this.rotate = function () {
    // check for ability to rotate
    this.state = this.state === 270 ? 0 : this.state + 90;
    const nextCoords = this.createCoords();
    for (let coord of nextCoords) {
      if (coord[0] < 0 || coord[0] > 9 || gameSpace[coord[1]][coord[0]] !== 0) {
        this.state = this.state === 0 ? 270 : this.state - 90;
        return;
      }
    }
    this.coords = this.createCoords();
    draw();
  };

  this.write = function () {
    console.log('writing to gameSpace...', this.coords);
    for (let coord of this.coords) {
      if (coord[1] < 4) {
        console.log('Reached the top - game over');
        draw();
        endGame();
        return false; ///////////// Insert Endgame function here
      }

      // clear lines
      gameSpace[coord[1]][coord[0]] = this.val;
      // console.log(y, gameSpace[y]);
    }
    for (let coord of this.coords) {
      if (!gameSpace[coord[1]].includes(0)) {
        gameSpace.splice(coord[1], 1);
        gameSpace.unshift(new Array(10).fill(0));
        score += 100;
        // activePiece = null;
      }
    }
    draw();
    return true;
  };

  this.translate = function (direction) {
    if (paused === true) return;
    // console.log(direction);

    switch (direction) {
      // move piece down one space
      case 'ArrowDown':
        // console.log(`moving down from row ${this.origin[1]} to row ${this.origin[1] + 1}`, this.origin);
        for (let coord of this.coords) {
          // console.log('y-coord = ' + coord[1]);
          if (coord[1] === 23 || gameSpace[coord[1] + 1][coord[0]] !== 0) {
            clearInterval(intervalId);
            this.write() ? nextPiece() : null;
            return;
          }
        }
        this.origin[1] += 1;
        this.coords = this.createCoords();
        draw();
        break;

      // move piece left one space
      case 'ArrowLeft':
        console.log('trying to move left');
        for (let coord of this.coords) {
          if (coord[0] === 0 || gameSpace[coord[1]][coord[0] - 1] !== 0) {
            return;
          }
        }
        this.origin[0] -= 1;
        this.coords = this.createCoords();
        draw();
        break;

      // move piece right one space
      case 'ArrowRight':
        console.log('trying to move right');
        // let occupied = false;
        for (let coord of this.coords) {
          console.log('x coord = ' + coord[0]);
          if (coord[0] === 9 || gameSpace[coord[1]][coord[0] + 1] !== 0) {
            return;
          }
        }
        this.origin[0] += 1;
        this.coords = this.createCoords();
        draw();
        break;
      default:
        return;
    }
  };
}


// Individual piece constructors
function I() {
  Piece.call(this);

  this.val = 1;

  this.createCoords = function () {
    let coords;
    switch (this.state) {
      case 90:
        coords = [
          [this.origin[0] - 2, this.origin[1]],
          [this.origin[0] - 1, this.origin[1]],
          [this.origin[0], this.origin[1]],
          [this.origin[0] + 1, this.origin[1]]
        ];
        break;
      case 180:
        coords = [
          [this.origin[0], this.origin[1] - 3],
          [this.origin[0], this.origin[1] - 2],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0], this.origin[1]]
        ];
        break;
      case 270:
        coords = [
          [this.origin[0] - 2, this.origin[1]],
          [this.origin[0] - 1, this.origin[1]],
          [this.origin[0], this.origin[1]],
          [this.origin[0] + 1, this.origin[1]]
        ];
        break;
      default:
        coords = [
          [this.origin[0], this.origin[1] - 3],
          [this.origin[0], this.origin[1] - 2],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0], this.origin[1]]
        ];
    }
    return coords;
  };
  this.coords = this.createCoords();
}


function J() {
  Piece.call(this);

  this.val = 2;

  this.createCoords = function () {
    let coords;
    switch (this.state) {
      case 90:
        coords = [
          [this.origin[0] - 1, this.origin[1] - 1],
          [this.origin[0] - 1, this.origin[1]],
          [this.origin[0], this.origin[1]],
          [this.origin[0] + 1, this.origin[1]]
        ];
        break;
      case 180:
        coords = [
          [this.origin[0], this.origin[1]],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0], this.origin[1] - 2],
          [this.origin[0] + 1, this.origin[1] - 2]
        ];
        break;
      case 270:
        coords = [
          [this.origin[0] - 1, this.origin[1] - 1],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0] + 1, this.origin[1] - 1],
          [this.origin[0] + 1, this.origin[1]]
        ];
        break;
      default:
        coords = [
          [this.origin[0] - 1, this.origin[1]],
          [this.origin[0], this.origin[1]],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0], this.origin[1] - 2]
        ];
    }
    return coords;
  };
  this.coords = this.createCoords();
}


function L() {
  Piece.call(this);

  this.val = 3;

  this.createCoords = function () {
    let coords;
    switch (this.state) {
      case 90:
        coords = [
          [this.origin[0] - 1, this.origin[1]],
          [this.origin[0] - 1, this.origin[1] - 1],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0] + 1, this.origin[1] - 1]
        ];
        break;
      case 180:
        coords = [
          [this.origin[0] - 1, this.origin[1] - 2],
          [this.origin[0], this.origin[1] - 2],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0], this.origin[1]]
        ];
        break;
      case 270:
        coords = [
          [this.origin[0] - 1, this.origin[1]],
          [this.origin[0], this.origin[1]],
          [this.origin[0] + 1, this.origin[1]],
          [this.origin[0] + 1, this.origin[1] - 1]
        ];
        break;
      default:
        coords = [
          [this.origin[0] - 1, this.origin[1] - 2],
          [this.origin[0] - 1, this.origin[1] - 1],
          [this.origin[0] - 1, this.origin[1]],
          [this.origin[0], this.origin[1]]
        ];
    }
    return coords;
  };
  this.coords = this.createCoords();
}


function O() {
  Piece.call(this);

  this.val = 4;

  this.createCoords = function () {
    let coords = [
      [this.origin[0] - 1, this.origin[1]],
      [this.origin[0] - 1, this.origin[1] - 1],
      [this.origin[0], this.origin[1] - 1],
      [this.origin[0], this.origin[1]]
    ];
    return coords;
  };
  this.coords = this.createCoords();
}


function S() {
  Piece.call(this);

  this.val = 5;

  this.createCoords = function () {
    let coords;
    switch (this.state) {
      case 90:
        coords = [
          [this.origin[0] - 1, this.origin[1] - 2],
          [this.origin[0] - 1, this.origin[1] - 1],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0], this.origin[1]]
        ];
        break;
      case 180:
        coords = [
          [this.origin[0] - 1, this.origin[1]],
          [this.origin[0], this.origin[1]],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0] + 1, this.origin[1] - 1]
        ];
        break;
      case 270:
        coords = [
          [this.origin[0] - 1, this.origin[1] - 2],
          [this.origin[0] - 1, this.origin[1] - 1],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0], this.origin[1]]
        ];
        break;
      default:
        coords = [
          [this.origin[0] - 1, this.origin[1]],
          [this.origin[0], this.origin[1]],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0] + 1, this.origin[1] - 1]
        ];
    }
    return coords;
  };
  this.coords = this.createCoords();
}


function T() {
  Piece.call(this);

  this.val = 6;

  this.createCoords = function () {
    let coords;
    switch (this.state) {
      case 90:
        coords = [
          [this.origin[0], this.origin[1] - 2],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0] + 1, this.origin[1] - 1],
          [this.origin[0], this.origin[1]]
        ];
        break;
      case 180:
        coords = [
          [this.origin[0] + 1, this.origin[1] - 1],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0], this.origin[1]],
          [this.origin[0] - 1, this.origin[1] - 1]
        ];
        break;
      case 270:
        coords = [
          [this.origin[0], this.origin[1]],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0] - 1, this.origin[1] - 1],
          [this.origin[0], this.origin[1] - 2]
        ];
        break;
      default:
        coords = [
          [this.origin[0] - 1, this.origin[1]],
          [this.origin[0], this.origin[1]],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0] + 1, this.origin[1]]
        ];
    }
    return coords;
  };
  this.coords = this.createCoords();
}


function Z() {
  Piece.call(this);

  this.val = 7;

  this.createCoords = function () {
    let coords;
    switch (this.state) {
      case 90:
        coords = [
          [this.origin[0] + 1, this.origin[1] - 2],
          [this.origin[0] + 1, this.origin[1] - 1],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0], this.origin[1]]
        ];
        break;
      case 180:
        coords = [
          [this.origin[0] - 1, this.origin[1] - 1],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0], this.origin[1]],
          [this.origin[0] + 1, this.origin[1]]
        ];
        break;
      case 270:
        coords = [
          [this.origin[0] + 1, this.origin[1] - 2],
          [this.origin[0] + 1, this.origin[1] - 1],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0], this.origin[1]]
        ];
        break;
      default:
        coords = [
          [this.origin[0] - 1, this.origin[1] - 1],
          [this.origin[0], this.origin[1] - 1],
          [this.origin[0], this.origin[1]],
          [this.origin[0] + 1, this.origin[1]]
        ];
    }
    return coords;
  };
  this.coords = this.createCoords();
}

function draw() {
  const canvas = $('canvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let colors = {
    0: '#222',
    1: '#0ff',
    2: '#00f',
    3: '#fb0',
    4: '#ff0',
    5: '#0f0',
    6: '#90f',
    7: '#f00'
  };
  for (let y = 4; y < gameSpace.length; y++) {
    for (let x in gameSpace[y]) {
      let val = gameSpace[y][x];
      // console.log(`val at gameSpace[${x}][${y}] = ${val}`);
      let color = colors[val];
      let h = canvas.height / (gameSpace.length - 4);
      let w = canvas.width / (gameSpace[y].length);
      ctx.fillStyle = color;
      ctx.fillRect(x * w, (y - 4) * h, w, h);
      ctx.strokeStyle = 'black';
      ctx.strokeRect(x * w, (y - 4) * h, w, h);
    }
  }
  for (let coord of activePiece.coords) {
    let x = coord[0];
    let y = coord[1];
    let val = activePiece.val;
    let color = colors[val];
    let h = canvas.height / (gameSpace.length - 4);
    let w = canvas.width / (gameSpace[y].length);
    // console.log('x = ' + x, 'y = ' + y, 'w = ' + w, 'h = ' + h);
    ctx.fillStyle = color;
    ctx.fillRect(x * w, (y - 4) * h, w, h);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(x * w, (y - 4) * h, w, h);
  }
  ctx.fillStyle = 'white';
  ctx.fillText(`Score: ${score}`, 10, 10);
}
