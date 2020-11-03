import Container from "./Container.js";
import Entity from "./Entity.js";
import Bullet from "./Bullet.js";

export default class Enemy extends Entity {
  constructor(pos, width, height, color) {
    super(pos, width, height);
    this.color = color;

    this.bullets = new Container();
  }

  shoot() {
    const bullet = new Bullet(
      { x: this.pos.x + this.width / 3, y: this.pos.y },
      this.width / 3,
      this.height,
      "white"
    );

    this.bullets.add(bullet);

    bullet.vel.y = 100;
  }

  render(ctx, deltaTime) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, 30, 30);

    if (Math.random() < 0.0001) this.shoot();

    this.bullets.render(ctx, deltaTime);
  }
}
