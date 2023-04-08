const timerElement = document.getElementById('timer');

const colorsByInterval = [
  "#96BE25",
  "#9AB425",
  "#9DA925",
  "#A19F25",
  "#A59525",
  "#A88B25",
  "#AC8025",
  "#AF7625",
  "#B36C25",
  "#B76225",
  "#BA5725",
  "#BE4D25"
];

const DEFAULT_TIMER_VALUE = '00:00:10';

const SECONDS_IN_A_MINUTE = 60;

const SECONDS_IN_A_HOUR = SECONDS_IN_A_MINUTE * SECONDS_IN_A_MINUTE;

timerElement.textContent = DEFAULT_TIMER_VALUE;

const [hour, minute, second] = DEFAULT_TIMER_VALUE.split(':');

const currentState = {
  hour: parseInt(hour),
  minute: parseInt(minute),
  second: parseInt(second)
};

const timeToMs = (hour, minute, second) => (hour * SECONDS_IN_A_HOUR + minute * SECONDS_IN_A_MINUTE + second) * 1000;

const currentTimeInMs = timeToMs(currentState.hour, currentState.minute, currentState.second);

var currentColorIndex = 0;

changeBackground(
  colorsByInterval[currentColorIndex]
);

const oneIntervalValueInSeconds = Math.floor(currentTimeInMs / 10);

const colorUpdateIntervalId = setInterval(getNextColor, oneIntervalValueInSeconds)

const tickIntervalId = setInterval(handleTick, 1000);

function changeBackground(color) {
  document.body.style.backgroundColor = color;
}

function addZeroIfNeeded(time) {
  return time < 10 || time === 0 ? `${time}`.padStart(2, '0') : `${time}`;  
}

function updateUI(state) {
  timerElement.textContent = Object.keys(state).map(key => addZeroIfNeeded(state[key])).join(':');
}

function getNextColor() {

  const nextColorIndex = currentColorIndex + 1;

  if (nextColorIndex > 10) return;

  currentColorIndex = nextColorIndex;

  changeBackground(
    colorsByInterval[nextColorIndex]
  );
}

function handleTick() {

  if (currentState.hour === 0 && currentState.minute === 0 && currentState.second === 0) {
    clearInterval(tickIntervalId);
    clearInterval(colorUpdateIntervalId);
    return;
  }

  if (currentState.second === 0) {

    if (currentState.minute === 0) {
      currentState.minute = 59;
      currentState.hour -= 1;
    } else {
      currentState.minute -= 1;
    }

    currentState.second = 59;
  } else {
    currentState.second -= 1;
  }

  updateUI(currentState);
}



