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
//Easy way to check that any parameters aren't set.
function check(list:Array<any>) {
  if (not(list)) return false;
  if (not(list.length)) return false;
  for(let items of list) {
    if(not(items)) return false;
    if(not(items.length)) return false;
    var parent = items[0];
    if (not(parent)) return false;
    for(let i = 1; i < items.length; i++) {
      parent = parent[items[i]];
      if (not(parent)) return false;
    }
  }
  return true;
}
//Functions for working with cookie

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
  "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days*24*60*60*1000));
    var expires = "; expires=" + date.toUTCString();
  }
  else var expires = "";
  document.cookie = name + "=" + value + expires + "; path=/";
}

function setCookie(name, value) {
  createCookie(name, value, 365);
}

function delCookie(name) {
  createCookie(name,"",-1);
}
//Errors manager
class Errors {

  errors:Array<any> = [];
  exists:boolean = false;

  addError(message?, code?) {
    var f = this;

    message = message || "Unknown error";
    code = code || 0;

    f.errors.push({
      message: message,
      code: code
    });

    f.exists = true;

    return f;
  }

  checkError(code) {
    var f = this;

    for(let error of f.errors) {
      if (error.code === code) return true;
    }

    return false;
  }

  getErrors() {
    var f = this;

    if (!f.exists) return "";

    let errors = "", i = 0;
    for(let error of f.errors) {
      errors += `[${i+1}] Error`;

      if (error.code) 
      errors += ` ${error.code}`;

      errors += ": " + error.message;

      i++; if (i === f.errors.length) break;
      errors += "\n";
    }
    return errors;
  }

  exportErrors() {
    var f = this;

    return {
      error: f.exists,
      errors: f.errors
    }
  }

  importErrors(res) {
    var f = this;

    f.exists = res.error;
    if (f.exists) {
      f.errors = res.errors;
    }

    return f;
  }

}
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

//Is object exist?
function is(obj:any) {
  if (obj === null || obj === undefined) return false;
  if (isNumber(obj) && isNaN(obj)) return false;
  else return true;
}

//Not exist?
function not(obj:any) {
  return !is(obj);
}

//Choose first existing object
function or(...list:Array<any>) {
  for(let value of list) {
    if (is(value)) return value;
  }
  return null;
}

//Check type
function isObject( objectToCheck ) {
  return Object.prototype.toString.call( objectToCheck ) === "[object Object]";
}
function isNumber( numberToCheck ) {
  return Object.prototype.toString.call( numberToCheck ) === "[object Number]";
}
function isString( stringToCheck ) {
  return Object.prototype.toString.call( stringToCheck ) === "[object String]";
}
function isArray( arrayToCheck ) {
  return Object.prototype.toString.call( arrayToCheck ) === "[object Array]";
}
function isFunction( functionToCheck ) {
  return Object.prototype.toString.call( functionToCheck ) === "[object Function]";
}
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
//More simple random function
function rand(a:number, b:number):number {  
  var c:number;
  var d:number;

  c = b - a;
  if (c < 0) return -1;
  d = Math.random()*c;
  d = Math.round(d);
  d += a;
  return d;
}

//Print random string
function randstr(length:number):string {
  var trace:string = "";
  for(let i=0; i<length; i++) {
    trace += rand(0,35).toString(36);
  }
  return trace;
}
function randcolor() {
  var hex = "";
  for(let i=0; i<6; i++) {
    hex += rand(0,15).toString(16);
  }
  return "#"+hex;
}

//Extra random string
class Dict {
  constructor(dict:string) {
    var alphabet = [ "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z" ];
    var numerals = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
    var sumerals = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9" ];
    var dict16 = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" ];
    var extra = [ "-", "_"];
    var dict36 = alphabet.concat(sumerals);
    var Alphabet = [];
    for (let letter of alphabet) Alphabet.push(letter.toUpperCase());
    var dict64 = dict36.concat(extra).concat(Alphabet);

    if (dict === "a") return alphabet;
    else if (dict === "n") return numerals;
    else if (dict === "s") return sumerals;
    else if (dict === "16") return dict16;
    else if (dict === "36") return dict36;
    else if (dict === "64") return dict64;
    else dict36;
  }
}

function randtext(length:number):string {
  var trace:string = "";
  var dict = new Dict("a");
  for(let i=0; i<length; i++) {
    trace += randomValue(dict);
  }
  return trace;
}
function randstr64(length:number):string {
  var trace:string = "";
  var dict = new Dict("64");
  for(let i=0; i<length; i++) {
    trace += randomValue(dict);
  }
  return trace;
}
function randomValue(array:any) {
  return array[ rand(0, array.length - 1) ];
}
//Superior round function
function round(n:number, e:number):number {
  var p:number;
  p = Math.pow(10,e);
  return Math.round(n*p)/p;
}
//Array shuffle
function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
}
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
//It's just a timer...
class Timer {
  triggers:any = {};
  intervalId:any;
  subscribeEvents:Events;
  constructor() {
    var f = this;

    f.triggers.isStarted = false;
    f.start();
  }

  //start, restart
  start() {
    var f = this;

    f.pause();

    f.triggers.counted = 0;
    f.triggers.checkpoint = 0;
    f.triggers.pausevalue = 0;
    f.subscribeEvents = new Events();

    f.go();
  }

  //pause
  pause() {
    var f = this;

    if (!f.triggers.isStarted) return;
    
    f.triggers.pausevalue = f.ms();
    clearInterval(f.intervalId);
    f.triggers.counted = f.triggers.time;
    
    f.triggers.isStarted = false;
  }

  //continue
  go() {
    var f = this;

    if (f.triggers.isStarted) return;
    
    f.triggers.startpoint = Date.now();
    f.intervalId = setInterval(function() {
      f.subscribeEvents.run(f.ms());
    }, 13);
    
    f.triggers.isStarted = true;
  }

  //show counted time
  ms() {
    var f = this;

    if (!f.triggers.isStarted) return f.triggers.pausevalue;
    f.triggers.time = Date.now() - f.triggers.startpoint + f.triggers.counted;
    return f.triggers.time;
  }
  s() {
    var f = this;
    return round(f.ms()/1000, 3);
  }

  //show counted time + left time since last checkpoint 
  i() {
    var f = this;
    var v:any = {};
    
    v.sec = f.s();
    v.delay = round(v.sec - f.triggers.checkpoint, 3); //v.delay uses new $time
    f.triggers.checkpoint = v.sec; //after v.delay, couse v.delay uses last $checkpoint
    
    v.replay = v.sec + " (+" + v.delay + ") sec";
    return v.replay;
  }

  //subscribe to timer
  subscribe(e:Function) {
    var f = this;
    f.subscribeEvents.push(e);
  }
}