import Player from "./classes/Player.js";
import Timer from "./classes/Timer.js";
import Container from "./classes/Container.js";

import { canvas, ctx, SIZE } from "./constants.js";
import { gameOver, nextWave } from "./functions.js";

let wave = 0;

const player = new Player(
  { x: canvas.width / 2 - SIZE / 2, y: canvas.height - SIZE * 2 },
  SIZE,
  SIZE
);

const game = new Container();

let enemies = nextWave(wave);

let score = 0;

game.add(player);
game.add(enemies);

function animate(deltaTime, frame) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.render(ctx, deltaTime, frame);

  player.bullets.children.forEach((bullet) => {
    enemies.children.forEach((enemy) => {
      score += bullet.hit(enemy) || 0;
    });
  });

  enemies.children.forEach((enemy) => {
    enemy.bullets.children.forEach((enemyBullet) => {
      enemyBullet.hit(player);
    });
  });

  ctx.font = "20pt sans-serif";
  ctx.fillStyle = "white";
  ctx.fillText(score, 10, canvas.height - 10);

  if (player.dead) gameOver();

  if (enemies.children.length <= 0) enemies = nextWave(wave);
}

Timer.start(animate);
