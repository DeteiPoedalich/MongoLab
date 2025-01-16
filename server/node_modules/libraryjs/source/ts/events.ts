//Easy way to call lots of functions
class Events {
  events:Arc;
  constructor() {
    this.events = new Arc();
  }

  add(name:string, event:Function) {
    this.events.add(name, event);
  }

  push(event:Function) {
    return this.events.push(event);
  }

  remove(name:string) {
    if (not(name)) return;
    this.events.remove(name);
  }

  run(param?:any) {
    for(let id in this.events.array) {
      this.events.value(id)(param);
    }
  }

  idrun(param?:any) {
    for(let id in this.events.array) {
      this.events.value(id)(id, param);
    }
  }
}
