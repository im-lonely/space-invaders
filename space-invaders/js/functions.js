import EnemyContainer from "./classes/EnemyContainer.js";
import Enemy from "./classes/Enemy.js";
import Timer from "./classes/Timer.js";

import { ctx, SIZE, colors } from "./constants.js";

export function nextWave(wave) {
  wave++;

  const newEnemies = new EnemyContainer({ x: 0, y: 0 }, 420, 210, wave, ctx);

  for (let ey = 0; ey < 7; ey++) {
    for (let ex = 0; ex < 14; ex++) {
      newEnemies.add(
        new Enemy({ x: ex * 30, y: ey * 30 }, SIZE, SIZE, colors[ey])
      );
    }
  }

  return newEnemies;
}

export function gameOver() {
  Timer.stop();

  ctx.font = "48pt sans-serif";
  ctx.fillStyle = "white";
  ctx.textAlign = "center";
  ctx.fillText("game over noob", canvas.width / 2, canvas.height / 2);
}
