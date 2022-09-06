'use strict';

function loadScores() {
  const getScores = JSON.parse(localStorage.getItem('scores'));
  allScores = getScores;
}

allScores = [];

function displayScores() {
  let tbodyEl = document.querySelector('#scoreboard tbody');

  for (let i = 0; i < allScores.length; i++) {
    let trEl = document.createElement('tr');
    tbodyEl.appendChild(trEl);
    let tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = allScores[i].name;
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = allScores[i].score;
    trEl.appendChild(tdEl);
  }
}
