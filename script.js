// DOM Elements
const sessionTimeDisplay = document.getElementById('session-time');
const breakTimeDisplay = document.getElementById('break-time');
const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-btn');
const resetButton = document.getElementById('reset-btn');
const sessionIncrement = document.getElementById('session-increment');
const sessionDecrement = document.getElementById('session-decrement');
const breakIncrement = document.getElementById('break-increment');
const breakDecrement = document.getElementById('break-decrement');

// Initial State
let sessionTime = 20; // in minutes
let breakTime = 5; // in minutes
let isSession = true; // true if session, false if break
let timerRunning = false;
let timerInterval = null;
let remainingTime = sessionTime * 60; // in seconds

// Update Display
function updateDisplay() {
  sessionTimeDisplay.textContent = `${sessionTime} min`;
  breakTimeDisplay.textContent = `${breakTime} min`;
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Start Timer
function startTimer() {
  if (timerRunning) return;

  timerRunning = true;
  startButton.disabled = true;
  sessionIncrement.disabled = true;
  sessionDecrement.disabled = true;
  breakIncrement.disabled = true;
  breakDecrement.disabled = true;

  timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      timerRunning = false;
      isSession = !isSession; // Toggle between session and break
      remainingTime = (isSession ? sessionTime : breakTime) * 60;
      startTimer(); // Automatically start the next cycle
    }
  }, 1000);
}

// Reset Timer
function resetTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  isSession = true;
  sessionTime = 20;
  breakTime = 5;
  remainingTime = sessionTime * 60;
  startButton.disabled = false;
  sessionIncrement.disabled = false;
  sessionDecrement.disabled = false;
  breakIncrement.disabled = false;
  breakDecrement.disabled = false;
  updateDisplay();
}

// Adjust Session Time
function adjustSessionTime(amount) {
  if (!timerRunning && sessionTime + amount > 0) {
    sessionTime += amount;
    if (isSession) remainingTime = sessionTime * 60;
    updateDisplay();
  }
}

// Adjust Break Time
function adjustBreakTime(amount) {
  if (!timerRunning && breakTime + amount > 0) {
    breakTime += amount;
    if (!isSession) remainingTime = breakTime * 60;
    updateDisplay();
  }
}

// Event Listeners
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);
sessionIncrement.addEventListener('click', () => adjustSessionTime(1));
sessionDecrement.addEventListener('click', () => adjustSessionTime(-1));
breakIncrement.addEventListener('click', () => adjustBreakTime(1));
breakDecrement.addEventListener('click', () => adjustBreakTime(-1));

// Initialize Display
updateDisplay();
