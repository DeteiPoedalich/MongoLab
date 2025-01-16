//When you have to wait a lot of callbacks
class Loading {
  param:any = {};
  vars:any = {};
  constructor(callback) {
    var f = this;
    f.param.callback = callback;

    f.vars.loadings = 0;
    f.vars.loaded = 0;
    f.vars.isStarted = false;
  }
  add() {
    var f = this;
    f.vars.loadings++;
  }
  done() {
    var f = this;
    f.vars.loaded++;
    f.check();
  }
  start() {
    var f = this;
    f.vars.isStarted = true;
    f.check();
  }
  check() {
    var f = this;
    if (!f.vars.isStarted) return;
    if (f.vars.loaded >= f.vars.loadings) f.param.callback();
  }
}