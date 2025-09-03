let timerId = null;
let timeLeft = 0; 
const timeDisplay = document.getElementById("time");
const endSound = new Audio('audio/alarm.mp3');

function updateDisplay() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timeDisplay.textContent = 
    `${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
}

function startTimer() {
  if (timerId === null) {
    timerId = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        endSound.play();
        clearInterval(timerId);
        timerId = null;
        alert("Time is over!"); 
      }
    }, 1000);
  }
}

function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  pauseTimer();
  const params = new URLSearchParams(window.location.search);
  const minutes = parseInt(params.get("minutes")) || 50;
  timeLeft = minutes * 60;
  updateDisplay();
}

// Eventos de botones

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);

//Conectar tiempo con URL //
const params = new URLSearchParams(window.location.search);
const minutes = parseInt(params.get("minutes")) || 25;
timeLeft = minutes * 60;
updateDisplay();



