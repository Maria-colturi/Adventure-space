class rocket {
    constructor (ctx, x, y) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = Math.floor(102 / 2);
        this.h = Math.floor(150 / 2);

        this.vx = ROCKET_SPEED;

        this.sprite = new Image();
        this.sprite.src = "/assets/img/rocket.png"
        this.sprite.horizontalFrames = 3;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.onload= () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
        }

        //this.animationTick = 0;
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case KEY_LEFT:
                this.vx = -ROCKET_SPEED;
                break;
              case KEY_RIGHT:
                this.vx = ROCKET_SPEED;
                break;
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case KEY_LEFT:
            case KEY_RIGHT:
                this.vx =0;
                break;
        }
    }
    move() {
        this.x += this.vx;
        if (this.x < -this.w){
            this.x = 0;
        }
        else if (this.x + this.w > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.w;
          }
    }

    draw() {
       if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.sprite.frameWidth + this.sprite.horizontalFrames,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.w,
                this.h
            );
                
        }
    }

    /*animate() {
        this.animationTick++;
    
        if (this.move()) {
          this.sprite.horizontalFrameIndex = 1;
        }
     }*/
}