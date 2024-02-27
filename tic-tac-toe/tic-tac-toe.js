let currentMove = 'X';
let xWinCount = 0;
let oWinCount = 0;
let tieCount = 0;
let filledCellCount = 0;
let c, r, d1, d2;

const rowElement = document.querySelectorAll('.row');

const crossHTML = `
  <div class="cross">
    <div class="before"></div>
    <div class="after"></div>
  </div>
`;

const circleHTML = `
  <div class="circle">
`;

document.querySelector('.reset')
  .addEventListener('click', () => {
    restartGame();
  });

rowElement.forEach(value => {
  value.addEventListener('click', () => {
    if (value.classList.contains('filled')) {
      return; //skip the following code
    } else {
      value.classList.add('filled');
    }

    value.classList.add(currentMove);

    if (currentMove === 'X') {
      value.innerHTML = crossHTML;
      currentMove = 'O';
    } else if (currentMove === 'O') {
      value.innerHTML = circleHTML;
      currentMove = 'X';
    }

    if (checkResult() === 'circle') {
      circleWin();
    } else if (checkResult() === 'cross') {
      crossWin();
    } else if (checkResult() === 'tie') {
      tie();
    };
  });
});

function checkResult() {
  // reset score
  c = {
    0: 0,
    1: 0,
    2: 0
  };

  r = {
    0: 0,
    1: 0,
    2: 0
  };

  d1 = 0;
  d2 = 0;

  filledCellCount = 0;

  let currentMoveValue;

  rowElement.forEach((value, index) => {
    value.classList.contains('X') ? currentMoveValue = -1 : currentMoveValue = 1;

    if (value.classList.contains('filled')) {
      filledCellCount++;
      if (index === 0 || index === 3 || index === 6) {
        column = 0;
      } else if (index === 1 || index === 4 || index === 7) {
        column = 1;
      } else if (index === 2 || index === 5 || index === 8) {
        column = 2;
      };

      if (index >= 0 && index < 3) {
        row = 0;
      } else if (index >= 3 && index < 6) {
        row = 1;
      } else if (index >= 6 && index < 9) {
        row = 2;
      };

      c[column] += currentMoveValue;
      r[row] += currentMoveValue;

      if (column === 1 & row === 1) {
        d1 += currentMoveValue;
        d2 += currentMoveValue;
      } else if (column === row) {
        d1 += currentMoveValue;
      } else if (Math.abs(column - row) === 2) {
        d2 += currentMoveValue;
      };
    };
  });

  // find if there is any winning line
  for (let i = 0; i < 3; i++) {
    if (c[i] === 3 || r[i] === 3) {
      return 'circle';
    } else if (c[i] === -3 || r[i] === -3) {
      return 'cross';
    } else if (d1 === 3 || d2 === 3) {
      return 'circle';
    } else if (d1 === -3 || d2 === -3) {
      return 'cross';
    };
  };

  // if the above for loop couldn't find any winning line, it is tie if all cell is filled
  if (filledCellCount === 9) {
    return 'tie';
  };
};

function crossWin() {
  xWinCount++;
  endGame();
  findWinningLine();
  flashWinningCells();
};

function circleWin() {
  oWinCount++;
  endGame();
  findWinningLine();
  flashWinningCells();
};

function tie() {
  tieCount++;
  endGame();
  findWinningLine();
  flashGrid();
};

function findWinningLine() {
  //  board index
  // |0|1|2|
  // |3|4|5|
  // |6|7|8|

  // check if it is diagonal lines winning
  if (Math.abs(d1) === 3) {
    highlightWinningCells(0, 4, 8);
  } else if (Math.abs(d2) === 3) {
    highlightWinningCells(6, 4, 2);
  };

  // check what line is winning
  [0, 1, 2].forEach(i => {
    if (Math.abs(c[i]) === 3) {
      if (i === 0) {
        highlightWinningCells(0, 3, 6);
        return;
      } else if (i === 1) {
        highlightWinningCells(1, 4, 7);
        return;
      } else if (i === 2) {
        highlightWinningCells(2, 5, 8);
        return;
      };
    } else if (Math.abs(r[i]) === 3) {
      console.log(`r${i} win`);
      if (i === 0) {
        highlightWinningCells(0, 1, 2);
        return;
      } else if (i === 1) {
        highlightWinningCells(3, 4, 5);
        return;
      } else if (i === 2) {
        highlightWinningCells(6, 7, 8);
        return;
      };
    };
  });

};

function highlightWinningCells(a, b, c) {
  rowElement.forEach((value, index) => {
    if (index === a || index === b || index === c) {
      value.classList.remove('no-win');
      value.classList.add('win');
    };
  });
};

let flashingIntervalId;
let flashingCount;

function flashWinningCells() {
  clearInterval(flashingIntervalId);
  flashingCount = 6;
  flashingIntervalId = setInterval(() => {
    if (flashingCount > 0) {
      flashingCount--;
      rowElement.forEach(value => {
        if (value.classList.contains('win')) {
          if (value.classList.contains('transparent')) {
            value.classList.remove('transparent');
          } else {
            value.classList.add('transparent');
          }
        };
      });
    } else {
      clearInterval(flashingIntervalId);
    }
  }, 125);
};

function flashGrid() {
  clearInterval(flashingIntervalId);

  const gridElement = document.querySelector('.grid');
  flashingCount = 6;
  flashingIntervalId = setInterval(() => {
    if (flashingCount > 0) {
      flashingCount--;
      if (gridElement.classList.contains('transparent')) {
        gridElement.classList.remove('transparent');
      } else {
        gridElement.classList.add('transparent');
      };
    } else {
      gridElement.classList.remove('transparent');
      clearInterval(flashingIntervalId);
    };
  }, 125);
};

function restartGame() {
  document.querySelectorAll('.row').forEach(value => {
    currentMove = 'X';
    value.innerHTML = '';

    // reset the row class
    value.classList.remove('filled');
    value.classList.remove('X');
    value.classList.remove('O');
    value.classList.remove('win');
    value.classList.remove('no-win');
    value.classList.remove('transparent');
  });
  document.getElementById('reset').style.display = 'none';
};

function endGame() {
  rowElement.forEach(value => {
    value.classList.add('no-win');
  });
  document.querySelector('.o-score').innerHTML = oWinCount;
  document.querySelector('.x-score').innerHTML = xWinCount;
  document.querySelector('.tie-score').innerHTML = tieCount;
  document.getElementById('reset').style.display = 'block';
};





