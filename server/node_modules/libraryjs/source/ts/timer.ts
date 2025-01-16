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