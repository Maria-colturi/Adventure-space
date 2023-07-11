class Bullet {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.w = 10;
    this.h = 40;

    this.vy = -1;

    this.img = new Image();
    this.img.src = "/assets/img/laserBlue01.png";
    this.img.onload = () => {
      this.img.isReady = true;
    }

    this.impact = false;
  }

  collideWith(meteorite) {
    return (
      this.x + this.w > meteorite.x &&
      this.x < meteorite.x + meteorite.w &&
      this.y + this.h > meteorite.y &&
      this.y < meteorite.y + meteorite.h
    )
    
  }

  draw() {
    if (this.img.isReady) {
      this.ctx.drawImage(
        this.img,
        this.x + 18,
        this.y - 25,
        this.w,
        this.h);

    }

  }

  move() {
    this.y += this.vy;
  }

  isVisible() {
    return this.y + this.h > 0;
  }
}