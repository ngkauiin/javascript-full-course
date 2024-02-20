const startStopButtonElement = document.querySelector('.start-stop-button');
const timeDisplayElement = document.querySelector('.time-display');
const lapResetButtonElement = document.querySelector('.lap-reset-button');

let timerIntervalId;
let lapTimerIntervalId;
let hunderdthOfSecond = 0;
let second = 0;
let minute = 0;

let hunderdthOfSecond_lap = 0;
let second_lap = 0;
let minute_lap = 0;

let isTimerRunning = false;

startStopButtonElement.addEventListener('click', ()=>{
  !isTimerRunning ? startTimer(): stopTimer();
})

lapResetButtonElement.addEventListener('click', ()=>{
  !isTimerRunning? resetTimer(): lapTimer();
})

function startTimer() {
  isTimerRunning = true;
  startStopButtonElement.innerHTML = 'Stop';
  lapResetButtonElement.innerHTML = 'Lap';

  // main timer interval
  timerIntervalId = setInterval(()=> {
    [minute,second,hunderdthOfSecond] = timerCounter(minute,second,hunderdthOfSecond);
    timeDisplayElement.innerHTML = formatTimer(minute,second,hunderdthOfSecond);
  },10)

  // lap timer interval
  lapTimerIntervalId = setInterval(()=> {
    [minute_lap,second_lap,hunderdthOfSecond_lap] = timerCounter(minute_lap,second_lap,hunderdthOfSecond_lap);
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

resetAllLap();
renderLapList();

function renderLapList() {
  let lapListHTML = '';

  for (let i = lapList.length - 1; i >= 0; i--) {
    const {lapCount} = lapList[i];
    const {timer} = lapList[i];
    const html = `
        <div class="lap-count">
          Lap ${lapCount}
        </div>
        <div class="lap-time-display">
          ${timer}
        </div>
      `;
    lapListHTML+=html;
  }

  document.querySelector('.lap-record-display')
    .innerHTML = lapListHTML;  
}

function lapTimer() {
  let timer = formatTimer(minute_lap,second_lap,hunderdthOfSecond_lap);
  lapList[lapList.length-1].timer = timer;
  minute_lap = 0;
  second_lap = 0;
  hunderdthOfSecond_lap = 0;
  lapCount++;
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
