class background {
    constructor (ctx) {
        this.ctx = ctx;
        
        this.x = 0;
        this.y = 0;
        this.w = this.ctx.canvas.width;
        this.h = this.ctx.canvas.height;

        this.vy = BACKGROUND_SPEED;

        this.img = new Image();
        this.img.src = "/assets/img/background.jpg";
        this.img.onload = () => {
        this.img.isReady = true;
        }

    }

    move() {
        this.y += this.vy; 
        if (this.y > this.h) {
           this.y = 0;
        } 
    }

    draw() {
        if (this.img.isReady) {
            this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
            this.ctx.drawImage(this.img, this.x, this.y + this.h, this.w, this.h);
        }
        
    }
}