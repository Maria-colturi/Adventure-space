class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.drawIntervalId = null;
    this.fps = 60;
    this.lifeGame = 3;
    this.score = 0;

    this.background = new Background(this.ctx);
    this.rocket = new Rocket(this.ctx, 400, 420);
    this.meteoriteRain = [];

    this.audio = new Audio("/assets/audios/background.ogg");
    this.audio.volume = 0.10;
    this.audio.loop = true;
    this.gameOversound = new Audio("/assets/audios/game-over.mp3");
    this.gameOversound.volume = 0.10;

    this.explosionImg = new Image();
    this.explosionImg.src = "/assets/img/explosion.png";
    this.explosionImg.onload = () => {
      this.explosionImg.isReady = true;
      this.explosionImg.width = 40;
      this.explosionImg.height = 40;
    };

    this.addTick = 0;
  }

  onKeyDown(event) {
    this.rocket.onKeyDown(event);
  }

  onKeyUp(event) {
    this.rocket.onKeyUp(event);
  }

  start() {
    if (!this.drawIntervalId) {
      this.audio.play();
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.move();
        this.checkCollisions();
        this.draw();
        this.loseLifes();
        this.clearMeteorites();
        this.clearBullets();
        this.addMeteorite();
        if (this.lifeGame === 0) {
          this.gameOver();
        }
        
      }, 1000 / this.fps);
    }
  }

  addMeteorite() {
    this.addTick++;
    if (this.addTick > 300) {
      this.addTick += 90
    }
    if (this.addTick % 120 === 0) {
      this.meteoriteRain.push(new Meteorite(this.ctx));
    }
  }

  checkCollisions() {
    this.checkCollisionMeteoriteWithRocket();
    this.checkCollisionBulletWithMeteorite();
  }

  checkCollisionBulletWithMeteorite() {
    this.meteoriteRain.forEach(meteorite => {
      const isTrue = this.rocket.bullets.some(bullet => {
        if (bullet.collideWith(meteorite)) {
          bullet.impact = true;
        }
        return bullet.collideWith(meteorite)
      })
      if (isTrue) {
        meteorite.img.src = "/assets/img/laserBlue08.png";
        meteorite.life = false;
        this.score += 100;
      }
    })
  }

  checkCollisionMeteoriteWithRocket() {
    const meteoriteCollideWithRocket = this.meteoriteRain.some(meteorite => this.rocket.collideWith(meteorite));
    if (meteoriteCollideWithRocket) {
      this.ctx.drawImage(this.explosionImg, this.canvas.width / 2, this.canvas.height / 2, 100, 100);
      this.gameOver();
    }
}

clear() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

clearMeteorites() {
  this.meteoriteRain = this.meteoriteRain.filter(meteorite => meteorite.life && meteorite.isVisible())
}

clearBullets() {
  this.rocket.bullets = this.rocket.bullets.filter(bullet => !bullet.impact && bullet.isVisible())
}

move() {
  this.background.move();
  this.rocket.move();
  this.meteoriteRain.forEach((meteorite) => meteorite.move());
}

draw() {
  this.background.draw();
  this.ctx.save();
  this.ctx.fillStyle = "white";
  this.ctx.font = "bold 35px verdana";
  this.ctx.fillText(`TOTAL LIFES: ${this.lifeGame}`, this.ctx.canvas.width - 200, 35, 150);
  this.ctx.fillText(`TOTAL SCORE: ${this.score.toString().padStart(5, "0")}`, 20, 35, 150);
  this.ctx.restore();
  this.rocket.draw();
  this.meteoriteRain.forEach((meteorite) => meteorite.draw());
}

loseLifes() {
  if (this.meteoriteRain.some(meteorite => !meteorite.isVisible())) {
    this.lifeGame--;
  }
}

stop() {
  clearInterval(this.drawIntervalId);
  this.drawIntervalId = undefined;
  this.audio.pause();
  }  

gameOver() {
  clearInterval(this.drawIntervalId);
  this.drawIntervalId = undefined;
  this.audio.pause();
  this.gameOversound.play();
  this.ctx.fillStyle = "rgb(11, 139, 219)";
  this.ctx.font = "bold 35px franklin Gothic Medium";
  this.ctx.fillText("GAME OVER", 300, 250)
}

}