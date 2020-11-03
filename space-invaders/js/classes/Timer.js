export default class Timer {
  static fps = 60;

  static iterationId;

  static deltaTime = 0;

  static lastTime = Date.now();

  static frame = 0;

  static off = false;

  static start(callback) {
    if (!Timer.off) {
      callback(Timer.deltaTime / 1000, Timer.frame);

      Timer.iterationId = setTimeout(() => {
        Timer.isRunning = true;

        const time = Date.now();
        Timer.deltaTime = time - this.lastTime;
        Timer.lastTime = time;

        Timer.start(callback);
      }, 1000 / Timer.fps);

      Timer.frame++;
    }
  }

  static stop() {
    clearTimeout(Timer.iterationId);
    Timer.iterationId = null;
    Timer.off = true;
  }
}
