class rocket {
    constructor (ctx, x, y) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = 50;
        this.h = 50;

        this.vx = 0;

        this.sprite = new Image();
        this.sprite.src = "/assets/img/rocket.png"
        this.sprite.onload= () => {
            this.sprite.isReady = true;
        }
    }

    draw() {
       if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                this.x,
                this.y,
                this.w,
                this.h
            );
                
        }
    }
}