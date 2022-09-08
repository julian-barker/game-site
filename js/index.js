function $(selector) { return document.querySelector(selector); }

const ldButton = $('#ld');
ldButton.addEventListener('click', lightDark);

let darkMode = localStorage['darkMode'];
console.log('darkmode = ' + darkMode);
if (darkMode !== undefined) {
  darkMode = JSON.parse(darkMode);
  console.log(darkMode);
  if (darkMode === true) {
    $('html').classList.add('dark');
  }
}

function lightDark() {
  $('html').classList.toggle('dark');
  console.log(darkMode);
  darkMode = !darkMode;
  console.log(darkMode);
  localStorage['darkMode'] = JSON.stringify(darkMode);
}
