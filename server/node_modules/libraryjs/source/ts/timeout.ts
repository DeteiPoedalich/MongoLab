//Superior setInterval and setTimeout
class Interval {
  protected param:any = {};
  protected vars:any = {};
  stoped:boolean = true;
  constructor (duration?:number, callback?:Function) {
    var f = this;
    f.create(duration, callback);
  }
  create(duratiom?:number, callback?:Function) {
    var f = this;
    f.set({
      duration: duratiom,
      callback: callback
    });
    f.start();
  }
  protected interval() {
    var f = this;
    if (f.stoped) return;
    f.vars.timeoutID = setTimeout(() => {
      if (f.stoped) return;
      f.param.callback();
      if (f.stoped) return;
      f.interval();
    }, f.param.duration);
  }
  set(param) {
    var f = this;
    if (is(param.duration)) f.param.duration = param.duration;
    if (is(param.callback)) f.param.callback = param.callback;
    if (is(param.after)) f.param.aftercallback = param.aftercallback;
  }
  call() {
    var f = this;
    if (f.stoped) return;
    f.param.callback();
    return f;
  }
  start() {
    var f = this;
    if (not(f.param.duration) || not(f.param.duration)) return;
    f.stoped = false;
    f.interval();
  }
  after(aftercallback:Function) {
    var f = this;
    f.set({ after: aftercallback });
  }
  stop() {
    var f = this;
    if (f.stoped) return;
    clearTimeout(f.vars.timeoutID);
    f.stoped = true;
    if (is(f.param.aftercallback)) f.param.aftercallback();
  }
  remove() { this.stop(); }
}
class Timeout extends Interval {
  protected interval() {
    var f = this;
    if (f.stoped) return;
    f.vars.timeoutID = setTimeout(() => {
      if (f.stoped) return;
      f.param.callback();
    }, f.param.duration);
  }
}