class Meteorite {
    constructor(ctx) {

        this.ctx = ctx;
        this.minWidth = 50;
        this.maxWidth = 750;
        this.x = Math.floor(Math.random() * (this.maxWidth - this.minWidth + 1) + this.minWidth);
        this.y = 0;
        this.w = 60;
        this.h = 60;

        this.vy = BACKGROUND_SPEED;

        this.img = new Image();
        this.img.src = "/assets/img/gray-met.png";
        this.img.onload = () => {
            this.img.isReady = true;
        }

        this.life = true;
    }

    move() {
        this.y += this.vy;
        if (this.y > this.ctx.canvas.height) {
        }
    }

    draw() {
        if (this.img.isReady) {
            this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
        }
    }

    isVisible() {
        return this.y < this.ctx.canvas.height;
    }

}

