let currentMove = 'X';
let currentMoveValue = 1;
let clickedRow;
let clickedCol;

let c ={
  0:0,
  1:0,
  2:0
};

let r = {
  0:0,
  1:0,
  2:0
};

// top left to bottom right
let d1 = 0;
let d2 = 0;

// console.log(document.querySelectorAll('.row'));

document.querySelectorAll('.row').forEach((value, index)=> {
  value.addEventListener('click', () => {
    // console.log(`row index: ${index}`);
    clickedRow = index;
    value.innerHTML = currentMove;
    currentMove === 'X' ? currentMove = 'O' : currentMove = 'X';
    currentMoveValue === 1 ? currentMoveValue = -1 : currentMoveValue = 1;
    // console.log(`current move: ${currentMove}`);
  })
})
document.querySelectorAll('.column').forEach((value, index)=> {
  value.addEventListener('click', () => {
    console.log(value.classList.contains('filled'));
    clickedCol = index;
    console.log(clickedCol,clickedRow);
    c[clickedCol]+=currentMoveValue;
    if (clickedRow === 0 || clickedRow === 3 ||clickedRow === 6  ) {
      clickedRow = 0;
      r[clickedRow]+=currentMoveValue;
    } else if (clickedRow === 1 || clickedRow === 4 ||clickedRow === 7) {
      clickedRow = 1;
      r[clickedRow]+=currentMoveValue;
    } else if (clickedRow === 2 || clickedRow === 5 ||clickedRow === 8) {
      clickedRow = 2;
      r[clickedRow]+=currentMoveValue;
    }

    if (clickedCol === 1 & clickedRow === 1){
      d1+=currentMoveValue;
      d2+=currentMoveValue;
    } else if (clickedCol===clickedRow) {
      d1+=currentMoveValue;
    } else if (Math.abs(clickedCol-clickedRow)===2) {
      d2+=currentMoveValue;
    }

    [0,1,2].forEach(i=>{
      if (c[i] === 3 || r[i] === 3) {
        alert('circle win!');
      } else if (c[i] === -3 || r[i] === -3){
        alert('cross win!');
      };
      console.log(`c${i}: ${c[i]}; r${i}: ${r[i]}`);
    });

    if (d1 === 3 || d2 === 3) {
      alert('circle win!');
    } else if (d1 === -3 || d2 === -3) {
      alert('cross win!');
    }


    console.log(`d1: ${d1}; d2: ${d2}`);
  })
})







