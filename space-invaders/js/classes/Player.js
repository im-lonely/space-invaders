import Bullet from "./Bullet.js";
import Container from "./Container.js";
import Entity from "./Entity.js";

export default class Player extends Entity {
  constructor(pos, width, height) {
    super(pos, width, height);

    this.bullets = new Container();

    this.maxBullets = 10000;

    this.keys = {};

    this.cooldown = 0;

    this.canShoot = true;

    document.addEventListener("keydown", (e) => {
      this.keys[e.code] = true;
    });

    document.addEventListener("keyup", (e) => {
      delete this.keys[e.code];
    });
  }

  shoot() {
    if (this.bullets.children.length <= this.maxBullets) {
      this.canShoot = false;

      const bullet = new Bullet(
        { x: this.pos.x + this.width / 3, y: this.pos.y - this.height },
        this.width / 3,
        this.height,
        "cyan"
      );

      this.bullets.add(bullet);

      bullet.vel.y = -1500;

      setTimeout(() => {
        this.canShoot = true;
      }, this.cooldown);
    }
  }

  render(ctx, deltaTime) {
    if (this.keys["KeyA"] || this.keys["ArrowLeft"]) this.vel.x -= 20;
    if (this.keys["KeyD"] || this.keys["ArrowRight"]) this.vel.x += 20;

    if (this.keys["Space"] && this.canShoot) this.shoot();

    if (this.pos.x < 0) {
      this.pos.x = 0;
      this.vel.x = 0;
    }

    if (this.pos.x + this.width > ctx.canvas.width) {
      this.pos.x = ctx.canvas.width - this.width;
      this.vel.x = 0;
    }

    this.pos.x += this.vel.x * deltaTime;
    this.vel.x *= 0.95;

    ctx.fillStyle = "white";
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);

    this.bullets.render(ctx, deltaTime);
  }
}
