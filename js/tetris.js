'use strict';


// shortcut functions for document methods
function $(selector) { return document.querySelector(selector); }
// function $$(selector) { return document.querySelectorAll(selector); }
function _(tag) { return document.createElement(tag); }


// Initialize global variables
let score = 0;
let paused = false;
let speed = 400; // sets interval between drops (in ms)
let intervalId; // used to stop setInterval
let activePiece; // used to call translate left/right with event listener
let nextPieceDisplay;

// nested 2d array (10x24)
const gameSpace = new Array(24).fill(0);
for (let i in gameSpace) {
  gameSpace[i] = new Array(10).fill(0);
}

// array to display next piece
const gameSpace2 = new Array(6).fill(0);
for (let i in gameSpace2) {
  gameSpace2[i] = new Array(7).fill(0);
}


// display play button on load
playButton();


////////////////////////////////////////////////////////
//////////          Functions Below           //////////
////////////////////////////////////////////////////////


// add event listeners for user to control the game
function addListeners(event) {
  if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    event.preventDefault();
  }
  if (event.key === ' ') {
    paused = !paused; // make false if true, true if false
    if (paused === false){
      const h2 = $('#pause');
      h2.remove();
    } else {
      const container = $('#canvas-container');
      const h2 = _('h2');
      h2.textContent = 'PAUSED';
      h2.id = 'pause';
      container.appendChild(h2);
      return;
    }
  }
  if (event.key === 'ArrowUp') {
    activePiece.rotate();
  } else {
    activePiece.translate(event.key);
  }
}

// starts running the game by calling nextPiece
function startTetris() {
  window.addEventListener('keydown', addListeners);
  console.log('Starting a new game...');
  paused = false;
  nextPiece();
  // console.log('done', gameSpace);
}

function reset() {
  // reset game state
  console.log('resetting the game state');
  score = 0;
  for (let y of gameSpace) {
    y.fill(0);
  }
  activePiece.coords = [[0,0]];
  draw();
}

// Calls new piece and begins dropping it using translate method with setInterval
function nextPiece() {
  if (!nextPieceDisplay) {
    activePiece = newPiece();
  } else {
    activePiece = nextPieceDisplay;
  }
  nextPieceDisplay = newPiece();
  drawNextPiece();
  console.log('new piece', activePiece);
  console.log('Dropping next piece');
  // setInterval returns the intervalId, used to cancel it later
  intervalId = setInterval(function () {
    activePiece.translate('ArrowDown');
  }, speed);
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

// brings up the score submission popup
function endGame() {
  paused = true;
  window.removeEventListener('keydown', addListeners);
  const container = $('#canvas-container');

  // create popup and inner elements
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
  // append to canvas container
  container.prepend(popup);

  console.log(gameSpace);
}

// submits inputted initials and score to local storage
function submitScore() {
  let scores;
  let maybeStored = localStorage.getItem('scores');
  if (maybeStored) {
    scores = JSON.parse(maybeStored);
  } else {
    scores = [];
  }

  const initials = $('#initials').value;

  if (initials.length > 3){
    alert('Three characters max!');
  } else if(initials === null || initials === ''){
    alert('Please enter initials!');
  } else{
    scores.push({initials, score});
    scores.sort((a, b) => b.score - a.score);
    localStorage['scores'] = JSON.stringify(scores);
    const popup = $('#popup');
    console.log(maybeStored);
    popup.remove();
    reset();
    playButton();
  }
}

// adds playbutton to screen
function playButton() {
  const container = $('#canvas-container');
  const play = _('button');
  // play.textContent = 'Play';
  play.id = 'playButton';
  container.appendChild(play);
  play.addEventListener('click', playHandler);
}

// calls for game to begin and removes the button
function playHandler() {
  let playButton = $('#playButton');
  playButton.remove();
  startTetris();
}

// checks for filled rows and clears them
function checkLine(piece) {
  let yCoords = []; // stores all y coordinates for each segment in a piece
  for (let coord of piece.coords) {
    if (!gameSpace[coord[1]].includes(0)) {
      yCoords.push(coord[1]);
    }
  }
  const set = [...new Set(yCoords)]; // create array with removed duplicates and assign to set
  set.sort((a, b) => a - b); // sorts in ascending order
  console.log(set);
  set.forEach( element => {
    gameSpace.splice(element, 1);
    gameSpace.unshift(new Array(10).fill(0));
    score += 100; // increment score
    speed *= 0.98; // 2% faster each time a line is cleared
  });
}

/////////////////////////////////
// Piece constructor functions //

// Overall Piece constructor function that holds several default methods and properties
// It is instantiated in individual piece constructors with Piece.call(this)
function Piece() {
  this.state = 0; // rotation state
  this.coords = []; // initializes coordinates
  this.origin = [5, 3]; // basis for coords

  this.rotate = function () {
    // check for ability to rotate
    this.state = this.state === 270 ? 0 : this.state + 90; // ternary operator - if state is 270, then set to 0, or else rotate by 90
    const nextCoords = this.createCoords();
    // valid future rotation state
    for (let coord of nextCoords) {
      if (coord[0] < 0 || coord[0] > 9 || gameSpace[coord[1]][coord[0]] !== 0) {
        this.state = this.state === 0 ? 270 : this.state - 90;
        return;
      }
    }
    // create rotated coordinates
    this.coords = this.createCoords();
    draw();
  };

  this.write = function () {
    console.log('writing to gameSpace...', this.coords);
    // write activePiece to gameSpace array
    for (let coord of this.coords) { // iterate through each coordinate (segment) of a piece
      // check for endgame criteria
      if (coord[1] < 4) {
        console.log('Reached the top - game over');
        draw();
        endGame();
        return false;
      }
      gameSpace[coord[1]][coord[0]] = this.val; // write individual piece segment to gamespce using the value of the piece that represents its color
    }
    checkLine(this);
    draw();
    return true;
  };

  this.translate = function (direction) {
    if (paused === true) return;
    // console.log(direction);

    switch (direction) {
      // move piece down one space
      case 'ArrowDown':
        for (let coord of this.coords) {
          // check if at the bottom or if space below is occupied, if so, write and generate the next piece
          if (coord[1] === 23 || gameSpace[coord[1] + 1][coord[0]] !== 0) {
            clearInterval(intervalId);
            this.write() ? nextPiece() : null;
            return;
          }
        }
        this.origin[1] += 1; // move piece down one
        this.coords = this.createCoords();
        draw();
        break;

      // move piece left one space
      case 'ArrowLeft':
        console.log('trying to move left');
        for (let coord of this.coords) {
          // check if at left edge or if space to the left is occupied
          if (coord[0] === 0 || gameSpace[coord[1]][coord[0] - 1] !== 0) {
            return;
          }
        }
        this.origin[0] -= 1; // move left one
        this.coords = this.createCoords();
        draw();
        break;

      // move piece right one space
      case 'ArrowRight':
        console.log('trying to move right');
        for (let coord of this.coords) {
          // check if at right edge or if space to the right is occupied
          if (coord[0] === 9 || gameSpace[coord[1]][coord[0] + 1] !== 0) {
            return;
          }
        }
        this.origin[0] += 1; // move right one
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
  // create instance of Piece
  Piece.call(this);

  // value to be written to the gamespace array
  this.val = 1;

  // create coordinates based on rotation state
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
  //assign coordinates to coordinates property
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



// Draw game to canvas
function draw() {
  const canvas = $('canvas');
  const ctx = canvas.getContext('2d');
  // clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // create piece color assignments
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

  // draw gamespace
  for (let y = 4; y < gameSpace.length; y++) {
    for (let x in gameSpace[y]) {
      let val = gameSpace[y][x];
      let color = colors[val];
      let h = canvas.height / (gameSpace.length - 4);
      let w = canvas.width / (gameSpace[y].length);
      const a = x * w;
      const b = (y - 4) * h;
      if (color === '#222') { // style empty cells differently
        ctx.fillStyle = color;
        ctx.fillRect(a, b, w, h);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(a, b, w, h);
      } else {
        const grad = ctx.createRadialGradient(a, b, h, a + 5, b - 5, h/2 - 5); //create gradient for block design
        grad.addColorStop(1, 'white');
        grad.addColorStop(0, color); // assign block color to gradient
        ctx.fillStyle = grad;
        ctx.fillRect(a, b, w, h); // fill blocks with gradient
        ctx.strokeStyle = 'black';
        ctx.strokeRect(a, b, w, h); // create border
        ctx.fillStyle = color; // reset fill to solid color
        ctx.fillRect(a + 4, b + 4, w - 8, h - 8); // fill middle of block with solid color
      }
    }
  }
  // draw active piece
  for (let coord of activePiece.coords) {
    let x = coord[0];
    let y = coord[1];
    let val = activePiece.val;
    let color = colors[val];
    let h = canvas.height / (gameSpace.length - 4);
    let w = canvas.width / (gameSpace[y].length);
    const a = x * w;// starting x-coord
    const b = (y - 4) * h;// starting y-coord
    const grad = ctx.createRadialGradient(a, b, h, a + 5, b - 5, h/2 - 5);
    grad.addColorStop(1, 'white');
    grad.addColorStop(0, color);
    ctx.fillStyle = grad;
    ctx.fillRect(a, b, w, h);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(a, b, w, h);
    ctx.fillStyle = color;
    ctx.fillRect(a + 4, b + 4, w - 8, h - 8);
  }
  // write score to top-left of screen
  ctx.fillStyle = 'white';
  ctx.font = 'bold 24px sans-serif';
  ctx.fillText(`Score: ${score}`, 10, 30);
}

// draw the next piece in its canvas
function drawNextPiece(){
  let canvas = $('#canvas2');
  let ctx2 = canvas.getContext('2d');
  ctx2.clearRect(0, 0, canvas.width, canvas.height);
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
  ctx2.fillStyle = '#222';
  ctx2.fillRect(0, 0, canvas.width, canvas.height);
  ctx2.strokeStyle = 'gray';
  ctx2.strokeRect(0, 0, canvas.width, canvas.height);
  for (let coord of nextPieceDisplay.coords) {
    let x = coord[0] - 3;
    let y = coord[1] + 1;
    let val = nextPieceDisplay.val;
    let color = colors[val];
    let h = canvas.height / 6;
    let w = canvas.width / 5;
    ctx2.fillStyle = color;
    ctx2.fillRect(x * w, y * h, w, h);
    ctx2.strokeStyle = 'black';
    ctx2.strokeRect(x * w, y * h, w, h);

    const a = x * w; // starting x-coord
    const b = y * h; // starting y-coord
    const grad = ctx2.createRadialGradient(a, b, h, a + 5, b - 5, h/2 - 5);
    grad.addColorStop(1, 'white');
    grad.addColorStop(0, color);
    ctx2.fillStyle = grad;
    ctx2.fillRect(a, b, w, h);
    ctx2.strokeStyle = 'black';
    ctx2.strokeRect(a, b, w, h);
    ctx2.fillStyle = color;
    ctx2.fillRect(a + 4, b + 4, w - 8, h - 8);

  }
}


