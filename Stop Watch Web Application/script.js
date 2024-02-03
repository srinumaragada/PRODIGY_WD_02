let startTime = 0;
let timerInterval;
let isRunning = false;
let lapCount = 1;

function formatTime(milliseconds) {
  const pad = (num) => num.toString().padStart(2, '0');
  const minutes = pad(Math.floor(milliseconds / 60000));
  const seconds = pad(Math.floor((milliseconds % 60000) / 1000));
  const millisecondsStr = pad(Math.floor((milliseconds % 1000) / 10));
  return `${minutes}:${seconds}:${millisecondsStr}`;
}

function startStop() {
  const startStopBtn = document.getElementById('startStop');
  if (isRunning) {
    clearInterval(timerInterval);
    startStopBtn.textContent = 'Start';
  } else {
    startTime = startTime || Date.now();
    timerInterval = setInterval(updateDisplay, 10);
    startStopBtn.textContent = 'Stop';
  }
  isRunning = !isRunning;
}

function updateDisplay() {
  const display = document.getElementById('display');
  const currentTime = Date.now() - startTime;
  display.textContent = formatTime(currentTime);
}

function reset() {
  clearInterval(timerInterval);
  const display = document.getElementById('display');
  display.textContent = '00:00:00';
  startTime = 0;
  isRunning = false;
  lapCount = 1;
  const lapsList = document.getElementById('laps');
  lapsList.innerHTML = '';
}

function recordLap() {
  if (isRunning) {
    const lapsList = document.getElementById('laps');
    const li = document.createElement('li');
    const currentTime = Date.now() - startTime;
    li.textContent = `Lap ${lapCount++}: ${formatTime(currentTime)}`;
    lapsList.prepend(li);
  }
}