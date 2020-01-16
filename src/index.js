
export default class FpsLocker {
  set fps( fps ){
  	this._fps = fps;
  	this.timeSlice = 1000 / fps
  }
  reset(){
  	this.cumulativeTime = this.lastTime = 0
  }
  constructor(
    onUpdate = () => console && console.warn("You have not provided an onUpdate method"),
    fps = 60,
    maxUpdates = 10
  ){
  	this.fps = fps;
    this.maxUpdates = maxUpdates;
    this.onUpdate = onUpdate;
  	this.reset()
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
      if (numUpdates > this.maxUpdates) numUpdates = this.maxUpdates;
      this.lastTime = now;
    }
    while (numUpdates-- > 0) this.onUpdate();
  }
}
