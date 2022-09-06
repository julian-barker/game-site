'use strict';

function $(selector) { return document.querySelector(selector); }
function $$(selector) { return document.querySelectorAll(selector); }
function _(tag) { return document.createElement(tag); }

const gameSpace = new Array(24).fill(0);
for (let i in gameSpace) {
  gameSpace[i] = new Array(10).fill(0);
}

let intervalId;
let activePiece;
const canvas = $('#canvas');

startTetris();


// starts running the game by calling nextPiece
function startTetris() {
  console.log(gameSpace);
  nextPiece();
  // console.log('done', gameSpace);
}

// Calls new piece and begins dropping it using translate method with setInterval
function nextPiece() {
  activePiece = newPiece();
  console.log('new piece', activePiece);
  console.log('Dropping next piece');
  intervalId = setInterval(function() {  // setInterval returns the intervalId, used to cancel it later
    activePiece.translate('down');
  }, 200);
  console.log('intervalId = ' + intervalId);
}

// Creates a new piece using RNG to randomly select one of the seven piece constructors
function newPiece() {
  console.log('Creating new piece...');
  let index = Math.floor(Math.random() * 7);
  switch(index) {
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


/////////////////////////////////
// Piece constructor functions //

// Overall Piece constructor function that holds several default methods and properties
// It is instantiated in individual piece constructors with Piece.call(this)
function Piece() {
  this.state = 0;
  this.coords = [];
  this.bottom = [5, 3];

  this.rotate = function() {
    this.state = this.state === 270 ? 0 : this.state + 90;
    this.createCoords();
  };

  this.write = function() {
    console.log('writing to gameSpace...', this.coords);
    for (let coord of this.coords) {
      const y = coord[1];
      if (y < 4) {
        console.log('reached top');
        return false; ///////////// Insert Endgame function here
      }
      gameSpace[coord[1]][coord[0]] = this.val;
      // console.log(y, gameSpace[y]);
      if (!gameSpace[y].includes(0)) {
        gameSpace.splice(y, 1);
        gameSpace.unshift(new Array(10).fill(0));
      }
    }
    return true;
  };

  this.translate = function(direction) {
    console.log(`moving down from row ${this.bottom[1]} to row ${this.bottom[1] + 1}`, this.coords);

    switch (direction) {
      case 'down':
        for (let coord of this.coords) {
          // console.log('y-coord = ' + coord[1]);
          if ( coord[1] === 23 || gameSpace[coord[1] + 1][coord[0]] !== 0) {
            clearInterval(intervalId);
            this.write() ? nextPiece() : null;
            return;
          }
        }
        this.bottom[1] += 1;
        this.createCoords();
        break;
      case 'left':
        for (let coord of this.coords) {
          if (gameSpace[coord[1]][coord[0] - 1] || coord[0] === 0) {
            return;
          } else {
            this.bottom[0] -= 1;
            this.createCoords();
          }
        }
        break;
      case 'right':
        for (let coord of this.coords) {
          if (gameSpace[coord[1]][coord[0] + 1] || coord[0] === 9) {
            return;
          } else {
            this.bottom[0] += 1;
            this.createCoords();
          }
        }
        break;
      default:
        return;
    }
  };
}


function I() {
  Piece.call(this);

  this.val = 1;

  this.createCoords = function() {
    switch(this.state) {
      case 90:
        this.coords = [
          [this.bottom[0] - 2, this.bottom[1]],
          [this.bottom[0] - 1, this.bottom[1]],
          [this.bottom[0], this.bottom[1]],
          [this.bottom[0] + 1, this.bottom[1]]
        ];
        break;
      case 180:
        this.coords = [
          [this.bottom[0], this.bottom[1] - 3],
          [this.bottom[0], this.bottom[1] - 2],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1]]
        ];
        break;
      case 270:
        this.coords = [
          [this.bottom[0] - 2, this.bottom[1]],
          [this.bottom[0] - 1, this.bottom[1]],
          [this.bottom[0], this.bottom[1]],
          [this.bottom[0] + 1, this.bottom[1]]
        ];
        break;
      default:
        this.coords = [
          [this.bottom[0], this.bottom[1] - 3],
          [this.bottom[0], this.bottom[1] - 2],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1]]
        ];
    }
  };

  this.createCoords();
}


function J() {
  Piece.call(this);

  this.val = 2;

  this.createCoords = function() {
    switch(this.state) {
      case 90:
        this.coords = [
          [this.bottom[0] - 1, this.bottom[1] - 1],
          [this.bottom[0] - 1, this.bottom[1]],
          [this.bottom[0], this.bottom[1]],
          [this.bottom[0] + 1, this.bottom[1]]
        ];
        break;
      case 180:
        this.coords = [
          [this.bottom[0], this.bottom[1]],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1] - 2],
          [this.bottom[0] + 1, this.bottom[1] - 2]
        ];
        break;
      case 270:
        this.coords = [
          [this.bottom[0] - 1, this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0] + 1, this.bottom[1] - 1],
          [this.bottom[0] + 1, this.bottom[1]]
        ];
        break;
      default:
        this.coords = [
          [this.bottom[0] - 1, this.bottom[1]],
          [this.bottom[0], this.bottom[1]],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1] - 2]
        ];
    }
  };

  this.createCoords();
}


function L() {
  Piece.call(this);

  this.val = 3;

  this.createCoords = function() {
    switch(this.state) {
      case 90:
        this.coords = [
          [this.bottom[0] - 1, this.bottom[1]],
          [this.bottom[0] - 1, this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0] + 1, this.bottom[1] - 1]
        ];
        break;
      case 180:
        this.coords = [
          [this.bottom[0] - 1, this.bottom[1] - 2],
          [this.bottom[0], this.bottom[1] - 2],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1]]
        ];
        break;
      case 270:
        this.coords = [
          [this.bottom[0] - 1, this.bottom[1]],
          [this.bottom[0], this.bottom[1]],
          [this.bottom[0] + 1, this.bottom[1]],
          [this.bottom[0] + 1, this.bottom[1] - 1]
        ];
        break;
      default:
        this.coords = [
          [this.bottom[0], this.bottom[1] - 2],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1]],
          [this.bottom[0] + 1, this.bottom[1]]
        ];
    }
  };
}


function O() {
  Piece.call(this);

  this.val = 4;

  this.createCoords = function() {
    this.coords = [
      [this.bottom[0] - 1, this.bottom[1]],
      [this.bottom[0] - 1, this.bottom[1] - 1],
      [this.bottom[0], this.bottom[1] - 1],
      [this.bottom[0], this.bottom[1]]
    ];
  };

  this.createCoords();
}


function S() {
  Piece.call(this);

  this.val = 5;

  this.createCoords = function() {
    switch(this.state) {
      case 90:
        this.coords = [
          [this.bottom[0] - 1, this.bottom[1] - 2],
          [this.bottom[0] - 1, this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1]]
        ];
        break;
      case 180:
        this.coords = [
          [this.bottom[0] - 1, this.bottom[1]],
          [this.bottom[0], this.bottom[1]],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0] + 1, this.bottom[1] - 1]
        ];
        break;
      case 270:
        this.coords = [
          [this.bottom[0] - 1, this.bottom[1] - 2],
          [this.bottom[0] - 1, this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1]]
        ];
        break;
      default:
        this.coords = [
          [this.bottom[0] - 1, this.bottom[1]],
          [this.bottom[0], this.bottom[1]],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0] + 1, this.bottom[1] - 1]
        ];
    }
  };

  this.createCoords();
}


function T() {
  Piece.call(this);

  this.val = 6;

  this.createCoords = function() {
    switch(this.state) {
      case 90:
        this.coords = [
          [this.bottom[0], this.bottom[1] - 2],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0] + 1, this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1]]
        ];
        break;
      case 180:
        this.coords = [
          [this.bottom[0] + 1, this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1]],
          [this.bottom[0] + 1, this.bottom[1] - 1]
        ];
        break;
      case 270:
        this.coords = [
          [this.bottom[0], this.bottom[1]],
          [this.bottom[0], this.bottom[1] -1],
          [this.bottom[0] - 1, this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1] - 2]
        ];
        break;
      default:
        this.coords = [
          [this.bottom[0] - 1, this.bottom[1]],
          [this.bottom[0], this.bottom[1]],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0] + 1, this.bottom[1]]
        ];
    }
  };


  this.createCoords();
}


function Z() {
  Piece.call(this);

  this.val = 7;

  this.createCoords = function() {
    switch(this.state) {
      case 90:
        this.coords = [
          [this.bottom[0] + 1, this.bottom[1] - 2],
          [this.bottom[0] - 1, this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1]]
        ];
        break;
      case 180:
        this.coords = [
          [this.bottom[0] - 1, this.bottom[1] - 2],
          [this.bottom[0] - 1, this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1]]
        ];
        break;
      case 270:
        this.coords = [
          [this.bottom[0] + 1, this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0], this.bottom[1]],
          [this.bottom[0] - 1, this.bottom[1]]
        ];
        break;
      default:
        this.coords = [
          [this.bottom[0] - 1, this.bottom[1]],
          [this.bottom[0], this.bottom[1]],
          [this.bottom[0], this.bottom[1] - 1],
          [this.bottom[0] + 1, this.bottom[1] - 1]
        ];
    }
  };

  this.createCoords();
}

