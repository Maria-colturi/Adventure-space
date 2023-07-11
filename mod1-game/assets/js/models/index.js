const game = new Game ("canvas");
const startBtn = document.getElementById("start-btn");
const homeBackground = document.getElementById("home-background");
const pauseBtn = document.getElementById("pause-btn");
const soundOff = document.getElementById("sound-off");
const buttonContainer = document.getElementById("btn-container");

window.addEventListener("keydown", (event) => {
    game.onKeyDown(event);
  });
  
window.addEventListener("keyup", (event) => {
    game.onKeyUp(event);
  });

document.getElementById("start-btn").onclick = () => {
  startBtn.remove();
  homeBackground.remove();
  console.log(buttonContainer.classList);
  buttonContainer.classList.remove("hidden");
  canvas.style.display = "block";
  game.start();
};

let isRunning = false;
document.getElementById("pause-btn").onclick = () => {
  if (isRunning) {
    game.stop();
    isRunning = false;
  } else {
    game.start();
    isRunning = true;
  }
}

let isPlaying = false;
document.getElementById("sound-off").onclick = () => {
  if (isPlaying) {
    game.audio.pause();
    isPlaying = false;
  } else {
    game.audio.play();
    isPlaying = true;
  }
}
  
