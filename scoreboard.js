'use strict';



// function loadScores() {
//   const getScores = JSON.parse(localStorage.getItem('scores'));
//   allScores = getScores;
// }


function Score(initials, score){
	this.initials = initials;
	this.score = score;
	allScores.push(this);
}

let allScores = [];

new Score('jul', 200);
new Score('mtr', 300);
new Score('cnd', 500);
new Score('crh', 1000);


function displayScores() {
  let tbodyEl = document.querySelector('#scoreboard tbody');

  for (let i = 0; i < allScores.length; i++) {
    let trEl = document.createElement('tr');
    tbodyEl.appendChild(trEl);
    let tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = allScores[i].initials;
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = allScores[i].score;
    trEl.appendChild(tdEl);
  }
}
displayScores();
