'use strict';

let allScores = [];

const tbodyEl = document.querySelector('#scoreboard tbody');

function loadScores() {
  const getScores = JSON.parse(localStorage.getItem('scores'));
  allScores = getScores;
  console.log(allScores);
}
loadScores();


function displayScores() {


  console.log(tbodyEl);

  for (let i = 0; i < allScores.length; i++) {
    let trEl = document.createElement('tr');
    tbodyEl.appendChild(trEl);
    let tdEl = document.createElement('td');
    tdEl = document.createElement('td');
    if(i >= 3 ){
      tdEl.textContent = `${i+1}TH`;
    } else{
      switch(i){
        case 0:
          tdEl.textContent = '1ST';
          break;
        case 1:
          tdEl.textContent = '2ND';
          break;
        case 2:
          tdEl.textContent = '3RD';
      }
    }
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = allScores[i].initials.toUpperCase();
    trEl.appendChild(tdEl);
    tdEl = document.createElement('td');
    tdEl.textContent = allScores[i].score;
    trEl.appendChild(tdEl);
  }
}
displayScores();
