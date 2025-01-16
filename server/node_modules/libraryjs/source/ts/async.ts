//Superior Promise
class Async {
  value:any;
  onload:Events;
  constructor(private param:any = {}) {
    if (not(this.param.disposable)) this.param.disposable = false;
    this.onload = new Events();
  }
  then(res:Function) {
    this.onload.push(res);
    if (is(this.value)) res(this.value);
  }
  set(value:any) {
    this.value = value;
    this.onload.run(value);
    if (this.param.disposable) this.onload = new Events();
  }
}