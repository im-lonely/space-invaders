export default class Entity {
  constructor(pos = { x: 0, y: 0 }, width = 0, height = 0) {
    this.pos = pos;
    this.vel = {
      x: 0,
      y: 0,
    };
    this.width = width;
    this.height = height;
    this.dead = false;
  }

  hit(object) {
    if (
      object.pos.x < this.pos.x + this.width &&
      object.pos.x + object.width > this.pos.x &&
      object.pos.y < this.pos.y + this.height &&
      object.pos.y + object.height > this.pos.y
    ) {
      object.dead = true;
      this.dead = true;
      return 10;
    }
  }

  render(ctx, deltaTime, frame) {}
}
