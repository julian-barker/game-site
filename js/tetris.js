'use strict';

function $(selector) { return document.querySelector(selector); }
function $$(selector) { return document.querySelectorAll(selector); }
function _(tag) { return document.createElement(tag); }

const pieces = [];



const canvas = $('#canvas');


function I() {
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

  this.rotate = function() {
    this.state = this.state === 270 ? 0 : this.state + 90;
    this.createCoords();
  };
}

const piece = new I();
console.log(piece);
