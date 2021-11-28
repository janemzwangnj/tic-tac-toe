// Global Variables Here
const buttons = document.querySelectorAll('Button');
// winningCases: [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]];
const players = ['playerX', 'playerO'];
let currentPlayer = players[0];
let counterX = 0;
let counterO = 0;
let counterTie = 0;

////////////////////////////////
// Functions For Game Logic Here
const inputXO = (aButton) => {
  if (currentPlayer === players[0]) {
    if (aButton.className === '') {
      document.getElementById('turn').innerText = "PlayerO's turn now!";
      aButton.innerText = 'X';
      aButton.className = 'X';
      checkWinning('X');
      currentPlayer = players[1];
    }
  } else if (currentPlayer === players[1]) {
    if (aButton.className === '') {
      document.getElementById('turn').innerText = "PlayerX's turn now!";
      aButton.innerText = 'O';
      aButton.className = 'O';
      checkWinning('O');
      currentPlayer = players[0];
    }
  }
};
//check winning
const checkWinning = (aClass) => {
  if (
    (buttons[0].innerText === aClass &&
      buttons[1].innerText === aClass &&
      buttons[2].innerText === aClass) ||
    (buttons[3].innerText === aClass &&
      buttons[4].innerText === aClass &&
      buttons[5].innerText === aClass) ||
    (buttons[6].innerText === aClass &&
      buttons[7].innerText === aClass &&
      buttons[8].innerText === aClass) ||
    (buttons[0].innerText === aClass &&
      buttons[3].innerText === aClass &&
      buttons[6].innerText === aClass) ||
    (buttons[1].innerText === aClass &&
      buttons[4].innerText === aClass &&
      buttons[7].innerText === aClass) ||
    (buttons[2].innerText === aClass &&
      buttons[5].innerText === aClass &&
      buttons[8].innerText === aClass) ||
    (buttons[0].innerText === aClass &&
      buttons[4].innerText === aClass &&
      buttons[8].innerText === aClass) ||
    (buttons[2].innerText === aClass &&
      buttons[4].innerText === aClass &&
      buttons[6].innerText === aClass)
  ) {
    document.getElementById('print').innerText =
      'The winner is ' + currentPlayer;
    document.getElementById('turn').innerText = 'Game Over!!';
    if (currentPlayer === players[0]) {
      counterX++;
      document.getElementById('xWin').innerText = `${counterX}`;
    } else {
      counterO++;
      document.getElementById('oWin').innerText = `${counterO}`;
    }
    for (let i = 0; i < buttons.length - 1; i++) {
      if (buttons[i].className === '') {
        buttons[i].className = 'temp';
      }
    }
  }
  let totalClicks =
    document.querySelectorAll('.X').length +
    document.querySelectorAll('.O').length;
  if (totalClicks >= 9) {
    counterTie++;
    document.getElementById('tie').innerText = `${counterTie}`;
    document.getElementById('print').innerText = 'It is a tie!';
    document.getElementById('turn').innerText = 'Game Over!!';
  }
};

const reset = () => {
  //console.log('will finish later!');
  for (let i = 0; i < buttons.length - 1; i++) {
    buttons[i].innerText = '';
    buttons[i].className = '';
  }
  document.getElementById('turn').innerText = '';
  document.getElementById('print').innerText = '';
  currentPlayer = players[0];
};

////////////////////////////////
// Event Listeners Here
const gameStart = () => {
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', () => {
      if (buttons[i].innerText !== 'RESET') {
        inputXO(buttons[i]);
      } else {
        reset();
      }
    });
  }
};
////////////////////////////////

gameStart();
