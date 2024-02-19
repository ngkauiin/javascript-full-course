let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();
const autoPlayButtonElement = document.querySelector('.auto-play-button');
const resetButtonContainerElement = document.querySelector('.reset-confirm-container');
let isAutoPlaying = false;
let intervalId;
let titleIntervalId;
let isNewMessages = false;
let totalGame = 0;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
      totalGame++;
    }, 500);

    titleIntervalId = setInterval(() => {
      if (!isNewMessages) {
        document.title = `AUTO PLAYING`;
        isNewMessages = true;
      } else {
        document.title = 'Rock Paper Scissors';
        isNewMessages = false;
      }
    },1000)

    autoPlayButtonElement.innerHTML = 'AUTO<p class="on-off-text">ON</p>';
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);
    clearInterval(titleIntervalId);
    totalGame = 0;
    document.title = 'Rock Paper Scissors';
    autoPlayButtonElement.innerHTML = 'AUTO<p class="on-off-text">OFF</p>';
    isAutoPlaying = false;
  }
}

document.querySelector('.rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });

document.querySelector('.reset-button')
  .addEventListener('click', () => {
    resetButtonContainerElement.classList.remove('toHide');
  });

document.querySelector('.auto-play-button')
  .addEventListener('click', () =>{
    autoPlay();
  });

document.querySelector('.yes-button')
  .addEventListener('click', () => {
    resetScore();
    resetButtonContainerElement.classList.add('toHide');
  });

document.querySelector('.no-button')
  .addEventListener('click', () => {
    resetButtonContainerElement.classList.add('toHide');
  });

document.body.addEventListener('keydown', (event)=>{
  console.log(event.key);
  if (event.key === 'ArrowLeft') {
    playGame('rock');
  } else if (event.key === 'ArrowDown') {
    playGame('paper');
  } else if (event.key === 'ArrowRight') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === ' ') {
    resetButtonContainerElement.classList.remove('toHide');
  }
});

function playGame(playerMove) {
const computerMove = pickComputerMove();

if (playerMove === 'rock') {
  if (computerMove === 'rock') {
    result = 'Tie.'
  } else if (computerMove === 'paper') {
    result ='You lose.';
  } else if (computerMove === 'scissors') {
    result = 'You win.';
  }

} else if (playerMove === 'paper') {
  if (computerMove === 'rock') {
    result = 'You win.'
  } else if (computerMove === 'paper') {
    result = 'Tie.';
  } else if (computerMove === 'scissors') {
    result = 'You lose.';
  }

} else if (playerMove === 'scissors') {
  if (computerMove === 'rock') {
    result = 'You lose.'
  } else if (computerMove === 'paper') {
    result = 'You win.';
  } else if (computerMove === 'scissors') {
    result = 'Tie.';
  }
}        

if (result === 'You win.') {
  score.wins++;
} else if (result === 'You lose.') {
  score.losses++;
} else if (result === 'Tie.') {
  score.ties++;
}

// local storage only support string
localStorage.setItem('score',JSON.stringify(score));

updateScoreElement();

document.querySelector('.result')
.innerText = `${result}`

document.querySelector('.move-container')
  .innerHTML = `<div class="player-move">
                  <p>You</p>
                  <img class='player-img' src="${playerMove}-emoji.png" alt="">
                </div>
                <div class="computer-move">
                  <p>Computer</p>
                  <img class='computer-img' src="${computerMove}-emoji.png" alt="">
                </div>`;
};

function pickComputerMove() {
let computerMove = '';
const randomNumber = Math.random();
if (randomNumber >= 0 && randomNumber < 1/3) {
  computerMove = 'rock';
} else if (randomNumber >= 1/3 && randomNumber < 2/3) {
  computerMove = 'paper'
} else if (randomNumber >= 2/3 && randomNumber < 1){
  computerMove = 'scissors'
}
return computerMove;
}

function resetScore() {  
  timeoutStatusText('Resetted.');
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

let resetScoreTimeoutId;
let isResetScoreTimeoutRunning = false;
const statusTextElement = document.querySelector('.status-text');

function timeoutStatusText(textToDisplay) {
  statusTextElement.classList.remove('toHide');
  statusTextElement.innerHTML = textToDisplay;
  if (!isResetScoreTimeoutRunning) {
    resetScoreTimeoutId = setTimeout(() => {
      statusTextElement.classList.add('toHide');
      isResetScoreTimeoutRunning = false;
    },2000)
    isResetScoreTimeoutRunning = true;
  } else {
    clearTimeout(resetScoreTimeoutId);
    resetScoreTimeoutId = setTimeout(() => {
      statusTextElement.classList.add('toHide');
      isResetScoreTimeoutRunning = false;
    },1500)
    isResetScoreTimeoutRunning = true;
  }
}

function updateScoreElement() {
document.querySelector('.score').innerText = 
  `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
}