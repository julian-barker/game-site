'use strict';

function $(selector) { return document.querySelector(selector); }
function $$(selector) { return document.querySelectorAll(selector); }
function _(tag) { return document.createElement(tag); }

const gameSpace = new Array(24).fill(0);
for (let i in gameSpace) {
  gameSpace[i] = new Array(10).fill(0);
}


const canvas = $('#canvas');



Piece.prototype.rotate = pieceRotate;

Piece.prototype.write = function() {
  console.log(this.coords);
  for (let coord of this.coords) {
    // console.log(coord);
    // console.log(coord[0], coord[1]);
    // console.log(gameSpace[coord[1]][coord[0]]);
    gameSpace[coord[1]][coord[0]] = this.val;
  }
};

Piece.prototype.translate = function(direction) {
  console.log(this.coords);

  switch (direction) {
    case 'down':
      for (let coord of this.coords) {
        console.log('y-coord = ' + coord[1]);
        if (gameSpace[coord[1] + 1][coord[0]] || coord[1] === 23) {
          this.write();
          return false;
        }
      }
      this.bottom[1] += 1;
      this.createCoords();
      console.log(this.coords);
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

// const pieces = [I, J, L, O, S, T, Z];


startTetris();



function startTetris() {
  console.log(gameSpace);
  nextPiece();
  // console.log('done', gameSpace);
}

function nextPiece() {
  const p = newPiece();
  console.log('p', p);
  let x = true;
  while(x) {
    x = setTimeout(translate, 1000, p, 'down');
  }
  // p.translate('down');
}


function newPiece() {
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
  // return new pieces[index];
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

function translate(object, direction) {
  object.translate(direction);
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
  Object.setPrototypeOf(this, Piece.prototype);
  this.val = 2;
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
  Object.setPrototypeOf(this, Piece.prototype);
  this.val = 3;
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
  Object.setPrototypeOf(this, Piece.prototype);

  this.val = 4;
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
  Object.setPrototypeOf(this, Piece.prototype);

  this.val = 5;
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
  Object.setPrototypeOf(this, Piece.prototype);

  this.val = 6;
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

function Z() {
  Object.setPrototypeOf(this, Piece.prototype);

  this.val = 7;
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

