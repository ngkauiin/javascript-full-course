let timerIntervalId;
let lapTimerIntervalId;
let hunderdthOfSecond = 0;
let second = 0;
let minute = 0;

let hunderdthOfSecond_lap = 0;
let second_lap = 0;
let minute_lap = 0;

let isTimerRunning = false;

const startStopButtonElement = document.querySelector('.start-stop-button');
const timeDisplayElement = document.querySelector('.time-display');
const lapResetButtonElement = document.querySelector('.lap-reset-button');

startStopButtonElement.addEventListener('click', ()=>{
  !isTimerRunning ? startTimer(): stopTimer();
})

lapResetButtonElement.addEventListener('click', ()=>{
  !isTimerRunning? resetTimer(): lapTimer();
})

function startTimer() {
  isTimerRunning = true;

  // when timer start, change to button text
  startStopButtonElement.innerHTML = 'Stop';
  startStopButtonElement.classList.add('stop');
  lapResetButtonElement.innerHTML = 'Lap';

  // main timer interval, displaying on the 
  timerIntervalId = setInterval(()=> {
    [minute,second,hunderdthOfSecond] = timerCounter(minute,second,hunderdthOfSecond);
    timeDisplayElement.innerHTML = formatTimer(minute,second,hunderdthOfSecond);
  },10)

  // lap timer interval
  lapTimerIntervalId = setInterval(()=> {
    [minute_lap,second_lap,hunderdthOfSecond_lap] = timerCounter(minute_lap,second_lap,hunderdthOfSecond_lap);
    // keep updating lap timer of the first lap element 
    document.querySelectorAll('.lap-time-display')
    .forEach((object, index)=>{
      if (index === 0) {
        object.innerHTML = formatTimer(minute_lap,second_lap,hunderdthOfSecond_lap);
      }
    });
  },10)
}

function timerCounter(minute,second,hunderdthOfSecond) {
  if (hunderdthOfSecond < 99) {
    hunderdthOfSecond++;
  } else if (hunderdthOfSecond === 99) {
    hunderdthOfSecond = 0;
    if (second < 60) {
      second++;
    } else if (second === 60) {
      second = 0;
      minute++;
    }
  } 
  return [minute,second,hunderdthOfSecond];
}

function stopTimer() {
  isTimerRunning = false;
  startStopButtonElement.innerHTML = 'Start';
  startStopButtonElement.classList.remove('stop');
  lapResetButtonElement.innerHTML = 'Reset';
  clearInterval(timerIntervalId);
  clearInterval(lapTimerIntervalId);
}

function formatTimer(minute,second,hunderdthOfSecond) {
  const timer = [minute, second, hunderdthOfSecond].map(number => {
    let formattedTimer = number.toLocaleString('en-US', {
      minimumIntegerDigits: 2,
      useGrouping: false
    });
    return formattedTimer;
  })    
  return `${timer[0]}:${timer[1]}.${timer[2]}`;
}

let lapCount;
let lapList;

// initialise the lap timer and lap display
resetAllLap();
renderLapList();

function renderLapList() {
  let lapListHTML = '';

  // changing the order to display the last item in lapList first so the current lap time is always at the top
  for (let i = lapList.length - 1; i >= 0; i--) {
    const {lapCount} = lapList[i];
    const {timer} = lapList[i];
    const html = `
      <div class="lap-container">
        <div class="lap-count">
          Lap ${lapCount}
        </div>
        <div class="lap-time-display">
          ${timer}
        </div>
      </div>
      `;
    lapListHTML+=html;
  }
  document.querySelector('.lap-record-display')
    .innerHTML = lapListHTML;  
}

function lapTimer() {
  let timer = formatTimer(minute_lap,second_lap,hunderdthOfSecond_lap);

  // reset the lap timer for new lap
  lapCount++;
  minute_lap = 0;
  second_lap = 0;
  hunderdthOfSecond_lap = 0;
  // update the current lap time to the last item in lapList before pushing a new time to prevent display error when rendoring
  lapList[lapList.length-1].timer = timer;
  lapList.push({lapCount,timer});
  renderLapList();
}

function resetTimer() {
  isTimerRunning = false;
  clearInterval(timerIntervalId);
  minute = 0;
  second = 0;
  hunderdthOfSecond = 0;
  timeDisplayElement.innerHTML = formatTimer(minute,second,hunderdthOfSecond);

  resetAllLap();
  renderLapList();
}

function resetAllLap() {
  clearInterval(lapTimerIntervalId);
  lapCount = 1;
  minute_lap = 0;
  second_lap = 0;
  hunderdthOfSecond_lap = 0;
  lapList = [{
    lapCount,
    timer: formatTimer(minute_lap,second_lap,hunderdthOfSecond_lap)
  }];
}
