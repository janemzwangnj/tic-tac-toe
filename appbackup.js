// Global Variables Here
const buttons = document.querySelectorAll('Button');
const winningCases = ['abc', 'def', 'ghi', 'adg', 'beh', 'cfi', 'aei', 'ceg'];
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
      checkWinning('.X');
      currentPlayer = players[1];
      // document.getElementById('turn').innerText = "PlayerO's turn now!";
    }
  } else if (currentPlayer === players[1]) {
    if (aButton.className === '') {
      document.getElementById('turn').innerText = "PlayerX's turn now!";
      aButton.innerText = 'O';
      aButton.className = 'O';
      checkWinning('.O');
      currentPlayer = players[0];
      //document.getElementById('turn').innerText = "PlayerX's turn now!";
    }
  }
};
//check winning
const checkWinning = (aClass) => {
  let xButtons = document.querySelectorAll(aClass);
  let aStringId = '';
  let winner = false;
  if (xButtons.length >= 3) {
    for (let i = 0; i < xButtons.length; i++) {
      aStringId = aStringId + xButtons[i].id;
    }
    winner = winDecision(aStringId, winner);
    if (winner === true) {
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
  }
  let totalClicks =
    document.querySelectorAll('.X').length +
    document.querySelectorAll('.O').length;
  if (totalClicks === 9 && !winner) {
    counterTie++;
    document.getElementById('tie').innerText = `${counterTie}`;
    document.getElementById('print').innerText = 'It is a tie!';
    document.getElementById('turn').innerText = 'Game Over!!';
  }
};
//knowing who is winner
const winDecision = (aStringId, winner) => {
  switch (aStringId.length) {
    case 3:
      for (let i = 0; i < winningCases.length; i++) {
        if (aStringId === winningCases[i]) {
          winner = true;
          break;
        }
      }
      break;
    case 4:
      //convert 4 bits of aStringId into 3 bits of aArray
      let aArray = [];
      aArray[0] = aStringId[0] + aStringId[1] + aStringId[2];
      aArray[1] = aStringId[0] + aStringId[1] + aStringId[3];
      aArray[2] = aStringId[0] + aStringId[2] + aStringId[3];
      aArray[3] = aStringId[1] + aStringId[2] + aStringId[3];
      for (let i = 0; i < aArray.length; i++) {
        for (let j = 0; j < winningCases.length; j++) {
          if (aArray[i] === winningCases[j]) {
            winner = true;
            break;
          }
        }
      }
      break;
    case 5:
      //convert 5 bits of aStringId into 3 bits of bArray
      let bArray = [];
      bArray[0] = aStringId[0] + aStringId[1] + aStringId[2];
      bArray[1] = aStringId[0] + aStringId[1] + aStringId[3];
      bArray[2] = aStringId[0] + aStringId[1] + aStringId[4];
      bArray[3] = aStringId[0] + aStringId[2] + aStringId[3];
      bArray[4] = aStringId[0] + aStringId[2] + aStringId[4];
      bArray[5] = aStringId[0] + aStringId[3] + aStringId[4];
      bArray[6] = aStringId[1] + aStringId[2] + aStringId[3];
      bArray[7] = aStringId[1] + aStringId[2] + aStringId[4];
      bArray[8] = aStringId[1] + aStringId[3] + aStringId[4];
      bArray[9] = aStringId[2] + aStringId[3] + aStringId[4];

      for (let i = 0; i < bArray.length; i++) {
        for (let j = 0; j < winningCases.length; j++) {
          if (bArray[i] === winningCases[j]) {
            winner = true;
            break;
          }
        }
      }
      break;
    default:
      console.log('should not be here');
  }
  return winner;
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
