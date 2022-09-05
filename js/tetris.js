'use strict';

function $(selector) { return document.querySelector(selector); }
function $$(selector) { return document.querySelectorAll(selector); }
function _(tag) { return document.createElement(tag); }

const gameSpace = new Array(24).fill(0);
for (let i in gameSpace) {
  gameSpace[i] = new Array(10).fill(0);
}

const pieces = [I, J, L, O];
const canvas = $('#canvas');



Piece.prototype.rotate = pieceRotate;
Piece.prototype.write = pieceWrite;


const piece = new I();
console.log(piece);




function newPiece() {
  let index = Math.floor(Math.random() * pieces.length);
  return new pieces[index];
}


function Piece() {
  // this.rotate = function() {
  //   this.state = this.state === 270 ? 0 : this.state + 90;
  //   this.createCoords();
  // };

  // this.write = function() {
  //   for (let coord of this.coords) {
  //     console.log(coord);
  //     console.log(coord[0], coord[1]);
  //     console.log(gameSpace[coord[1]][coord[0]]);
  //     gameSpace[coord[1]][coord[0]] = this.val;
  //   }
  // };
}

function pieceRotate() {
  this.state = this.state === 270 ? 0 : this.state + 90;
  this.createCoords();
}


function pieceWrite() {
  for (let coord of this.coords) {
    // console.log(coord);
    // console.log(coord[0], coord[1]);
    // console.log(gameSpace[coord[1]][coord[0]]);
    gameSpace[coord[1]][coord[0]] = this.val;
  }
}


function translatePiece(direction) {
  switch (direction) {
    case 'down':
      for (let coord of this.coords) {
        if (gameSpace[coord[1] + 1][coord[0]] || coord[1] === 23) {
          this.write();
          return;
        } else {
          this.bottom[1] -= 1;
          this.createCoords();
        }
      }
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
}


function I() {
  Object.setPrototypeOf(this, Piece.prototype);
  this.val = 1;
  this.state = 0;
  this.coords = [];
  this.bottom = [5, 3];

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
  this.val = 1;
  this.state = 0;
  this.coords = [];
  this.bottom = [5, 3];

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
  this.val = 2;
  this.state = 0;
  this.coords = [];
  this.bottom = [5, 3];

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
  this.val = 2;
  this.state = 0;
  this.coords = [];
  this.bottom = [5, 3];

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
  this.val = 1;
  this.state = 0;
  this.coords = [];
  this.bottom = [5, 3];

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
    this.val = 1;
    this.state = 0;
    this.coords = [];
    this.bottom = [5, 3];
  
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

const piece = new T();
console.log(piece);

function Z() {
    this.val = 1;
    this.state = 0;
    this.coords = [];
    this.bottom = [5, 3];
  
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

