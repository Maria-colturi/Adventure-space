const game = new Game ("canvas");

window.addEventListener("keydown", (event) => {
    game.onKeyDown(event);
  });
  
window.addEventListener("keyup", (event) => {
    game.onKeyUp(event);
  });
  
game.start();