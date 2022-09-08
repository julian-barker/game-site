const buttonEl = document.getElementById('ff-button');
buttonEl.addEventListener('click', triviaGame);

let score = 0;

//
function proofPrompt(question) {
  let answer = prompt(question);
  while (answer === '') {
    alert('Please enter a valid answer.');
    answer = prompt(question);
  }
  return answer.toLowerCase();
}

function triviaGame() {
  switch (proofPrompt('What year was Tetris invented?')) {
    case '1984':
    case '84':
      alert('Correct!');
      score++;
      console.log(score);
      break;
    default:
      alert('Nice try.');
      console.log(score);
      break;
  }

  switch (proofPrompt('Who invented Tetris?')) {
    case 'alexey pajitnov':
      alert('Correct!');
      score++;
      console.log(score);
      break;
    case 'alexey':
      alert('Close! You got his first name correct.');
      score += 0.5;
      console.log(score);
      break;
    case 'pajitnov':
      alert('Close! You got his last name correct.');
      score += 0.5;
      console.log(score);
      break;
    default:
      alert('Nice try.');
      console.log(score);
      break;
  }

  switch (proofPrompt('What game inspired the game Tetris?')) {
    case 'pentonimos':
      alert('Correct!');
      score++;
      break;
    default:
      alert('Nice try.');
      console.log(score);
      break;
  }

  switch (proofPrompt('What is the nane of the Tetris song?')) {
    case 'korobeiniki':
      alert('Correct!');
      score++;
      break;
    default:
      alert('Nice try.');
      console.log(score);
      break;
  }

  switch (
    proofPrompt(
      'In 2012 which state had Tetris as an art piece in one of their mueseums?'
    )
  ) {
    case 'nyc':
    case 'new york city':
      alert('Correct!');
      score++;
      break;
    default:
      alert('Nice try.');
      console.log(score);
      break;
  }

  switch (proofPrompt('Is Tetris in the Guiness Book of Wolrd Records?')) {
    case 'y':
    case 'yes':
    case 'yep':
    case 'yeah':
    case 'yup':
    case 'uh huh':
    case 'ya':
    case 'yas':
      alert('Correct!');
      score++;
      break;
    default:
      alert('Nice try.');
      console.log(score);
      break;
  }

  switch (
    proofPrompt(
      'Was Tetris the first game in space on a Russian mission in 1992?'
    )
  ) {
    case 'n':
    case 'no':
    case 'nope':
    case 'nah':
    case 'nuh uh':
    case 'naw':
    case 'nae':
    case 'nay':
    case 'nix':
      alert('Correct!');
      score++;
      break;
    default:
      alert('Nice try.');
      console.log(score);
      break;
  }

	alert(`You got ${score}/7 answers correct!`);
}
