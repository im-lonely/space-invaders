import Container from "./Container.js";

export default class EnemyContainer extends Container {
  constructor(pos, width, height, wave, ctx) {
    super(pos, width, height);
    this.ctx = ctx;
    this.children = [];
    this.speed = 1000 / Math.floor(Math.pow(1.1, wave));
    this.dir = 30;
    this.moveDown = false;
    this.moveAcross = false;

    setInterval(() => {
      if (!this.moveDown || this.moveAcross) {
        this.pos.x += this.dir;
        this.children.forEach((child) => {
          child.pos.x += this.dir;
        });
        this.moveDown = false;
        this.moveAcross = false;
      } else {
        this.pos.y += 30;
        this.moveDown = false;
        this.children.forEach((child) => {
          child.pos.y += 30;
        });
        this.dir *= -1;
        this.moveAcross = true;
      }

      if (this.pos.x <= 0 || this.pos.x + this.width >= this.ctx.canvas.width) {
        this.moveDown = true;
      }

      if (this.children.length <= 0) this.dead = true;
    }, this.speed);
  }
}
