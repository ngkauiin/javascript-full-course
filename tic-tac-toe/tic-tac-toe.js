let currentMove = 'X';
let c, r,d1,d2;

// console.log(document.querySelectorAll('.row'));

document.querySelectorAll('.column').forEach((value, index)=> {
  value.addEventListener('click', () => {
    column = index;

    // console.log(`current move: ${currentMove}`);
  })
})

const rowElement = document.querySelectorAll('.row');

rowElement.forEach((value, index)=> {
  // console.log(value.classList.contains('filled'));
  value.addEventListener('click', () => {
    // console.log(index);

    if (value.classList.contains('filled')) {
      alert('filled');
      return;
    } else {
      value.classList.add('filled');
    }

    value.classList.add(currentMove);
    if (currentMove === 'X') {
      currentMove = 'O';
    } else {
      currentMove = 'X';
    }

    c ={
      0:0,
      1:0,
      2:0
    };
    
    r = {
      0:0,
      1:0,
      2:0
    };
    
    // top left to bottom right
    d1 = 0;
    d2 = 0;
    
    rowElement.forEach((value,index)=>{
      // console.log(value, index);
      // checkResult(index);

      checkResult(value, index);
    })
  })

});



function checkResult(value, index) {
  let currentMoveValue;

  if (value.classList.contains('X')) {
    currentMoveValue = -1;
  } else if (value.classList.contains('O')){
    currentMoveValue = 1;
  }
  if (value.classList.contains('filled')) {
    if (index === 0 || index === 3 || index === 6  ) {
      column = 0;
    } else if (index === 1 || index === 4 ||index === 7) {
      column = 1;
    } else if (index === 2 || index === 5 ||index === 8) {
      column = 2;
    }
  
    if (index>=0 && index < 3) {
      row = 0;
    } else if (index>=3 && index < 6) {
      row = 1;
    } else if (index>=6 && index < 8) {
      row = 2;
    }
    console.log(column,row);

    c[column]+=currentMoveValue;
    r[row]+=currentMoveValue;

    if (column === 1 & row === 1){
      d1+=currentMoveValue;
      d2+=currentMoveValue;
    } else if (column===row) {
      d1+=currentMoveValue;
    } else if (Math.abs(column-row)===2) {
      d2+=currentMoveValue;
    }

    [0,1,2].forEach(i=>{
      console.log(`c${i}: ${c[i]}; r${i}: ${r[i]}`);
      if (c[i] === 3 || r[i] === 3) {
        console.log('circle win!');
      } else if (c[i] === -3 || r[i] === -3){
        console.log('cross win!');
      };
      
    });

    console.log(`d1: ${d1}; d2: ${d2}`);
    if (d1 === 3 || d2 === 3) {
      console.log('circle win!');
    } else if (d1 === -3 || d2 === -3) {
      console.log('cross win!');
    }

  }
  

  // console.log(column, row);
  // if (column === 1 & index === 1){
  //   d1+=currentMoveValue;
  //   d2+=currentMoveValue;
  // } else if (column===row) {
  //   d1+=currentMoveValue;
  // } else if (Math.abs(column-row)===2) {
  //   d2+=currentMoveValue;
  // }

  // [0,1,2].forEach(i=>{
  //   if (c[i] === 3 || r[i] === 3) {
  //     console.log('circle win!');
  //   } else if (c[i] === -3 || r[i] === -3){
  //     console.log('cross win!');
  //   };
  //   console.log(`c${i}: ${c[i]}; r${i}: ${r[i]}`);
  // });

  // if (d1 === 3 || d2 === 3) {
  //   console.log('circle win!');
  // } else if (d1 === -3 || d2 === -3) {
  //   console.log('cross win!');
  // }
  // console.log(`d1: ${d1}; d2: ${d2}`);
}







