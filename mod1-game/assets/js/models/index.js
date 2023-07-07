const game = new Game ("canvas");
const startBtn = document.getElementById("start-btn")

window.addEventListener("keydown", (event) => {
    game.onKeyDown(event);
  });
  
window.addEventListener("keyup", (event) => {
    game.onKeyUp(event);
  });

canvas.style.display = "none";
startBtn.focus();

document.getElementById("start-btn").onclick = () => {
  startBtn.remove();
  canvas.style.display = "block";
  game.start();
}
  
