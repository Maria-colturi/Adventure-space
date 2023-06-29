class Game {
    constructor (canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.drawIntervalId = null;
        this.fps = 60;

        this.background = new background(this.ctx);
        this.rocket = new rocket(this.ctx, 10, 420);

    }

    onKeyDown(event) {
        this.rocket.onKeyDown(event);
      }
    
    onKeyUp(event) {
        this.rocket.onKeyUp(event);
      }

    start() {
        if (!this.drawIntervalId) {
            this.drawIntervalId = setInterval(() => {
              this.clear();
              this.move();
              this.draw(); 
              }, 1000 / this.fps);
             }
     }

     stop() {
        clearInterval(this.drawIntervalId);
        this.drawIntervalId = undefined;
      }

     clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }

     move() {
        this.background.move();
        this.rocket.move();
     }

     draw() {
        this.background.draw();
        this.rocket.draw();
     }


}