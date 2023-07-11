class Rocket {
    constructor(ctx, x, y) {
        this.ctx = ctx;

        this.x = x;
        this.y = y;
        this.w = 51;
        this.h = 75;

        this.vx = 0;

        this.sprite = new Image();
        this.sprite.src = "/assets/img/rocket.png"
        this.sprite.horizontalFrames = 2;
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrames = 1;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.onload = () => {
            this.sprite.isReady = true;
            this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
            this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
        }

        this.shootSound = new Audio("/assets/audios/laser.ogg");

        this.bullets = [];

        this.animationTick = 0;
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case KEY_LEFT:
                this.vx = -ROCKET_SPEED;
                break;
            case KEY_RIGHT:
                this.vx = ROCKET_SPEED;
                break;
            case KEY_SPACE:
                this.shoot();
                break
        }
    }

    onKeyUp(event) {
        switch (event.keyCode) {
            case KEY_LEFT:
            case KEY_RIGHT:
                this.vx = 0;
                break;
        }
    }

    shoot() {
        this.bullets.push(new Bullet(this.ctx, this.x, this.y));
        this.shootSound.play();
    }

    collideWith(element) {
        return (
            this.x + this.w > element.x &&
            this.x < element.x + element.w &&
            this.y + this.h > element.y &&
            this.y < element.y + element.h
        );
    }

    move() {
        this.x += this.vx;
        if (this.x < 0) {
            this.x = 0;
        } else if (this.x + this.w > this.ctx.canvas.width) {
            this.x = this.ctx.canvas.width - this.w;
        }

        this.bullets.forEach((bullet) => bullet.move());

    }

    draw() {
        if (this.sprite.isReady) {
            this.ctx.drawImage(
                this.sprite,
                //this.sprite.frameWidth + this.sprite.horizontalFrames,
                this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
                this.sprite.verticalFrameIndex * this.sprite.frameHeight,
                this.sprite.frameWidth,
                this.sprite.frameHeight,
                this.x,
                this.y,
                this.w,
                this.h
            );
            this.animate();
        }

        this.bullets.forEach((bullet) => bullet.draw());
    }

    animate() {
        this.animationTick++;

        if (this.move()) {
            this.sprite.horizontalFrameIndex = 1;
        } else if (this.animationTick > ROCKET_MOVE_ANIMATION_TICK) {
            this.animationTick = 0;
            this.sprite.horizontalFrameIndex++;

            if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
                this.sprite.horizontalFrameIndex = 0;
            }
        }
    }
}