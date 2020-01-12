import {
  DEFAULT_FPS,
  DEFAULT_MAX_UPDATES,
  DEFAULT_ON_UPDATE
} from "./constants";

export default class FpsLocker {
  constructor(
    onUpdate = DEFAULT_ON_UPDATE,
    fps = DEFAULT_FPS,
    maxUpdates = DEFAULT_MAX_UPDATES
  ) {
    this.cumulativeTime = 0;
    this.timeSlice = 1000 / fps;
    this.maxUpdates = maxUpdates;
    this.onUpdate = onUpdate;
  }

  update(now = performance.now()) {
    let numUpdates = 1;

    if (!this.lastTime) {
      this.lastTime = now;
    } else {
      const elapsed = now - this.lastTime;

      this.cumulativeTime += elapsed;
      numUpdates = (this.cumulativeTime / this.timeSlice) | 0;
      this.cumulativeTime -= numUpdates * this.timeSlice;

      if (numUpdates > this.maxUpdates) {
        numUpdates = this.maxUpdates;
      }

      this.lastTime = now;
    }

    while (numUpdates-- > 0) {
      this.onUpdate();
    }
  }
}
