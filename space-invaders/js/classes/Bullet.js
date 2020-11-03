import Entity from "./Entity.js";

export default class Bullet extends Entity {
  constructor(pos, width, height, color) {
    super(pos, width, height);
    this.color = color;
  }

  render(ctx, deltaTime) {
    this.pos.y += this.vel.y * deltaTime;

    if (this.pos.y + this.height < 0) this.dead = true;

    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
}
