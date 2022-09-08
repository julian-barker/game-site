function $(selector) { return document.querySelector(selector); }

const ldButton = $('#ld');
ldButton.addEventListener('click', lightDark);

let darkMode = localStorage['darkMode'];
console.log('darkmode = ' + darkMode);
if (darkMode !== undefined) {
  if (darkMode) {
    $('html').classList.add('dark');
  }
}

function lightDark() {
  $('html').classList.toggle('dark');
  darkMode = !darkMode;
  localStorage['darkMode'] = darkMode;
}
