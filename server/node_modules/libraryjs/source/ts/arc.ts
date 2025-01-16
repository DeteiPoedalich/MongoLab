//Superior array
class Arc {
  array:any;
  length:number;
  id:number;
  constructor() {
    this.array = {};
    this.length = 0;
    this.id = 0;
  }

  add(name:string, value:any) {
    if (not(this.array[name])) this.length++;
    this.array[name] = value;
  }

  push(value:any) {
    var id:string = "arcUnicId" + this.id;
    this.id++;
    this.add(id, value);
    return id;
  }

  value(name:string) {
    return this.array[name];
  }

  remove(name:string) {
    if (is(this.array[name])) this.length--;
    this.array[name] = null;
    delete this.array[name];
  }

  search(value:any) {
    var valueLocal:any;
    for(let i in this.array) {
      valueLocal = this.value(i);
      if (valueLocal == value) return i;
    };
  }

  forEach(callback:Function) {
    for(let name in this.array) {
      callback(name, this.array[name]);
    }
  }

  toString() {
    var trace:string = "";
    for(let i in this.array) {
      trace += "["+i+"] " + this.value(i) + "\n";
    };
    return trace;
  }
}