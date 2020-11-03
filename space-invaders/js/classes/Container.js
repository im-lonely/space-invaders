import Entity from "./Entity.js";

export default class Container extends Entity {
  constructor(pos, width = 0, height = 0) {
    super(pos, width, height);
    this.children = [];
  }

  add(child) {
    this.children.push(child);
  }

  remove(child) {
    this.children = this.children.filter((gameObject) => gameObject !== child);
  }

  render(ctx, deltaTime, frame) {
    this.children.forEach((child) => {
      if (child.render) child.render(ctx, deltaTime, frame);
      if (child.dead) this.remove(child);
    });
  }
}
