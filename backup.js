const timeHTML = document.getElementById('time'),
  progressBar = document.getElementById('progress'),
  addBtn = document.getElementById('add-button'),
  removeBtn = document.getElementById('remove-button'),
  resetBtn = document.getElementById('reset'),
  startBtn = document.getElementById('start'),
  stopBtn = document.getElementById('stop');

let displayedTime = '00:00',
  currentTime = 0,
  timerRunning = false,
  interval;

// Event Listeners
addBtn.addEventListener('click', () => {
  adjustTime('add');
  updateTimeOnScreen();
});

removeBtn.addEventListener('click', () => {
  if (currentTime > 0) {
    adjustTime('deduct');
    updateTimeOnScreen();
  }
});

resetBtn.addEventListener('click', () => resetTime());

startBtn.addEventListener('click', () => startTimer());

stopBtn.addEventListener('click', () => {
  stopTimer();
});

// Functions
const updateTimeOnScreen = () => {
  let TIS = currentTime;
  let TIM = Math.floor(TIS / 60);
  let remSec = TIS % 60;

  displayedTime = `${TIM < 10 ? '0' + parseInt(TIM) : parseInt(TIM)}:${
    remSec < 10 ? '0' + parseInt(remSec) : parseInt(remSec)
  }`;

  timeHTML.textContent = displayedTime;
};

const adjustTime = operator => {
  if (!timerRunning) {
    if (operator === 'add') {
      currentTime = currentTime + 60;
    } else {
      currentTime = currentTime - 60;
    }
  }
};

const resetTime = () => {
  stopTimer();
  timerRunning = false;
  displayedTime = '00:00';
  currentTime = 0;
  progress.style.width = '100%';
  timeHTML.textContent = displayedTime;
};

const startTimer = () => {
  if (timerRunning || currentTime === 0) return;
  timerRunning = true;

  if (progress.style.width !== '100%') {
    progressInc = parseFloat(progress.style.width) / currentTime;
  } else {
    progressInc = 100 / currentTime;
  }

  interval = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      updateTimeOnScreen();
      progress.style.width = `${parseFloat(progress.style.width) -
        progressInc}%`;
    } else {
      progress.style.width = '0%';
      stopTimer();
    }
  }, 250);
};

const stopTimer = () => {
  if (!timerRunning) return;
  clearInterval(interval);
  timerRunning = false;
};
