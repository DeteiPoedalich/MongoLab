var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
//Superior array
var Arc = (function () {
    function Arc() {
        this.array = {};
        this.length = 0;
        this.id = 0;
    }
    Arc.prototype.add = function (name, value) {
        if (not(this.array[name]))
            this.length++;
        this.array[name] = value;
    };
    Arc.prototype.push = function (value) {
        var id = "arcUnicId" + this.id;
        this.id++;
        this.add(id, value);
        return id;
    };
    Arc.prototype.value = function (name) {
        return this.array[name];
    };
    Arc.prototype.remove = function (name) {
        if (is(this.array[name]))
            this.length--;
        this.array[name] = null;
        delete this.array[name];
    };
    Arc.prototype.search = function (value) {
        var valueLocal;
        for (var i in this.array) {
            valueLocal = this.value(i);
            if (valueLocal == value)
                return i;
        }
        ;
    };
    Arc.prototype.forEach = function (callback) {
        for (var name_1 in this.array) {
            callback(name_1, this.array[name_1]);
        }
    };
    Arc.prototype.toString = function () {
        var trace = "";
        for (var i in this.array) {
            trace += "[" + i + "] " + this.value(i) + "\n";
        }
        ;
        return trace;
    };
    return Arc;
}());
//Superior Promise
var Async = (function () {
    function Async(param) {
        if (param === void 0) { param = {}; }
        this.param = param;
        if (not(this.param.disposable))
            this.param.disposable = false;
        this.onload = new Events();
    }
    Async.prototype.then = function (res) {
        this.onload.push(res);
        if (is(this.value))
            res(this.value);
    };
    Async.prototype.set = function (value) {
        this.value = value;
        this.onload.run(value);
        if (this.param.disposable)
            this.onload = new Events();
    };
    return Async;
}());
//Easy way to check that any parameters aren't set.
function check(list) {
    if (not(list))
        return false;
    if (not(list.length))
        return false;
    for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
        var items = list_1[_i];
        if (not(items))
            return false;
        if (not(items.length))
            return false;
        var parent = items[0];
        if (not(parent))
            return false;
        for (var i = 1; i < items.length; i++) {
            parent = parent[items[i]];
            if (not(parent))
                return false;
        }
    }
    return true;
}
//Functions for working with cookie
function getCookie(name) {
    var matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function createCookie(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toUTCString();
    }
    else
        var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}
function setCookie(name, value) {
    createCookie(name, value, 365);
}
function delCookie(name) {
    createCookie(name, "", -1);
}
//Errors manager
var Errors = (function () {
    function Errors() {
        this.errors = [];
        this.exists = false;
    }
    Errors.prototype.addError = function (message, code) {
        var f = this;
        message = message || "Unknown error";
        code = code || 0;
        f.errors.push({
            message: message,
            code: code
        });
        f.exists = true;
        return f;
    };
    Errors.prototype.checkError = function (code) {
        var f = this;
        for (var _i = 0, _a = f.errors; _i < _a.length; _i++) {
            var error = _a[_i];
            if (error.code === code)
                return true;
        }
        return false;
    };
    Errors.prototype.getErrors = function () {
        var f = this;
        if (!f.exists)
            return "";
        var errors = "", i = 0;
        for (var _i = 0, _a = f.errors; _i < _a.length; _i++) {
            var error = _a[_i];
            errors += "[" + (i + 1) + "] Error";
            if (error.code)
                errors += " " + error.code;
            errors += ": " + error.message;
            i++;
            if (i === f.errors.length)
                break;
            errors += "\n";
        }
        return errors;
    };
    Errors.prototype.exportErrors = function () {
        var f = this;
        return {
            error: f.exists,
            errors: f.errors
        };
    };
    Errors.prototype.importErrors = function (res) {
        var f = this;
        f.exists = res.error;
        if (f.exists) {
            f.errors = res.errors;
        }
        return f;
    };
    return Errors;
}());
//Easy way to call lots of functions
var Events = (function () {
    function Events() {
        this.events = new Arc();
    }
    Events.prototype.add = function (name, event) {
        this.events.add(name, event);
    };
    Events.prototype.push = function (event) {
        return this.events.push(event);
    };
    Events.prototype.remove = function (name) {
        if (not(name))
            return;
        this.events.remove(name);
    };
    Events.prototype.run = function (param) {
        for (var id in this.events.array) {
            this.events.value(id)(param);
        }
    };
    Events.prototype.idrun = function (param) {
        for (var id in this.events.array) {
            this.events.value(id)(id, param);
        }
    };
    return Events;
}());
//Is object exist?
function is(obj) {
    if (obj === null || obj === undefined)
        return false;
    if (isNumber(obj) && isNaN(obj))
        return false;
    else
        return true;
}
//Not exist?
function not(obj) {
    return !is(obj);
}
//Choose first existing object
function or() {
    var list = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        list[_i] = arguments[_i];
    }
    for (var _a = 0, list_2 = list; _a < list_2.length; _a++) {
        var value = list_2[_a];
        if (is(value))
            return value;
    }
    return null;
}
//Check type
function isObject(objectToCheck) {
    return Object.prototype.toString.call(objectToCheck) === "[object Object]";
}
function isNumber(numberToCheck) {
    return Object.prototype.toString.call(numberToCheck) === "[object Number]";
}
function isString(stringToCheck) {
    return Object.prototype.toString.call(stringToCheck) === "[object String]";
}
function isArray(arrayToCheck) {
    return Object.prototype.toString.call(arrayToCheck) === "[object Array]";
}
function isFunction(functionToCheck) {
    return Object.prototype.toString.call(functionToCheck) === "[object Function]";
}
//When you have to wait a lot of callbacks
var Loading = (function () {
    function Loading(callback) {
        this.param = {};
        this.vars = {};
        var f = this;
        f.param.callback = callback;
        f.vars.loadings = 0;
        f.vars.loaded = 0;
        f.vars.isStarted = false;
    }
    Loading.prototype.add = function () {
        var f = this;
        f.vars.loadings++;
    };
    Loading.prototype.done = function () {
        var f = this;
        f.vars.loaded++;
        f.check();
    };
    Loading.prototype.start = function () {
        var f = this;
        f.vars.isStarted = true;
        f.check();
    };
    Loading.prototype.check = function () {
        var f = this;
        if (!f.vars.isStarted)
            return;
        if (f.vars.loaded >= f.vars.loadings)
            f.param.callback();
    };
    return Loading;
}());
//More simple random function
function rand(a, b) {
    var c;
    var d;
    c = b - a;
    if (c < 0)
        return -1;
    d = Math.random() * c;
    d = Math.round(d);
    d += a;
    return d;
}
//Print random string
function randstr(length) {
    var trace = "";
    for (var i = 0; i < length; i++) {
        trace += rand(0, 35).toString(36);
    }
    return trace;
}
function randcolor() {
    var hex = "";
    for (var i = 0; i < 6; i++) {
        hex += rand(0, 15).toString(16);
    }
    return "#" + hex;
}
//Extra random string
var Dict = (function () {
    function Dict(dict) {
        var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
        var numerals = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var sumerals = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        var dict16 = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        var extra = ["-", "_"];
        var dict36 = alphabet.concat(sumerals);
        var Alphabet = [];
        for (var _i = 0, alphabet_1 = alphabet; _i < alphabet_1.length; _i++) {
            var letter = alphabet_1[_i];
            Alphabet.push(letter.toUpperCase());
        }
        var dict64 = dict36.concat(extra).concat(Alphabet);
        if (dict === "a")
            return alphabet;
        else if (dict === "n")
            return numerals;
        else if (dict === "s")
            return sumerals;
        else if (dict === "16")
            return dict16;
        else if (dict === "36")
            return dict36;
        else if (dict === "64")
            return dict64;
        else
            dict36;
    }
    return Dict;
}());
function randtext(length) {
    var trace = "";
    var dict = new Dict("a");
    for (var i = 0; i < length; i++) {
        trace += randomValue(dict);
    }
    return trace;
}
function randstr64(length) {
    var trace = "";
    var dict = new Dict("64");
    for (var i = 0; i < length; i++) {
        trace += randomValue(dict);
    }
    return trace;
}
function randomValue(array) {
    return array[rand(0, array.length - 1)];
}
//Superior round function
function round(n, e) {
    var p;
    p = Math.pow(10, e);
    return Math.round(n * p) / p;
}
//Array shuffle
function shuffle(a) {
    for (var i = a.length; i; i--) {
        var j = Math.floor(Math.random() * i);
        _a = [a[j], a[i - 1]], a[i - 1] = _a[0], a[j] = _a[1];
    }
    var _a;
}
//Superior setInterval and setTimeout
var Interval = (function () {
    function Interval(duration, callback) {
        this.param = {};
        this.vars = {};
        this.stoped = true;
        var f = this;
        f.create(duration, callback);
    }
    Interval.prototype.create = function (duratiom, callback) {
        var f = this;
        f.set({
            duration: duratiom,
            callback: callback
        });
        f.start();
    };
    Interval.prototype.interval = function () {
        var f = this;
        if (f.stoped)
            return;
        f.vars.timeoutID = setTimeout(function () {
            if (f.stoped)
                return;
            f.param.callback();
            if (f.stoped)
                return;
            f.interval();
        }, f.param.duration);
    };
    Interval.prototype.set = function (param) {
        var f = this;
        if (is(param.duration))
            f.param.duration = param.duration;
        if (is(param.callback))
            f.param.callback = param.callback;
        if (is(param.after))
            f.param.aftercallback = param.aftercallback;
    };
    Interval.prototype.call = function () {
        var f = this;
        if (f.stoped)
            return;
        f.param.callback();
        return f;
    };
    Interval.prototype.start = function () {
        var f = this;
        if (not(f.param.duration) || not(f.param.duration))
            return;
        f.stoped = false;
        f.interval();
    };
    Interval.prototype.after = function (aftercallback) {
        var f = this;
        f.set({ after: aftercallback });
    };
    Interval.prototype.stop = function () {
        var f = this;
        if (f.stoped)
            return;
        clearTimeout(f.vars.timeoutID);
        f.stoped = true;
        if (is(f.param.aftercallback))
            f.param.aftercallback();
    };
    Interval.prototype.remove = function () { this.stop(); };
    return Interval;
}());
var Timeout = (function (_super) {
    __extends(Timeout, _super);
    function Timeout() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Timeout.prototype.interval = function () {
        var f = this;
        if (f.stoped)
            return;
        f.vars.timeoutID = setTimeout(function () {
            if (f.stoped)
                return;
            f.param.callback();
        }, f.param.duration);
    };
    return Timeout;
}(Interval));
//It's just a timer...
var Timer = (function () {
    function Timer() {
        this.triggers = {};
        var f = this;
        f.triggers.isStarted = false;
        f.start();
    }
    //start, restart
    Timer.prototype.start = function () {
        var f = this;
        f.pause();
        f.triggers.counted = 0;
        f.triggers.checkpoint = 0;
        f.triggers.pausevalue = 0;
        f.subscribeEvents = new Events();
        f.go();
    };
    //pause
    Timer.prototype.pause = function () {
        var f = this;
        if (!f.triggers.isStarted)
            return;
        f.triggers.pausevalue = f.ms();
        clearInterval(f.intervalId);
        f.triggers.counted = f.triggers.time;
        f.triggers.isStarted = false;
    };
    //continue
    Timer.prototype.go = function () {
        var f = this;
        if (f.triggers.isStarted)
            return;
        f.triggers.startpoint = Date.now();
        f.intervalId = setInterval(function () {
            f.subscribeEvents.run(f.ms());
        }, 13);
        f.triggers.isStarted = true;
    };
    //show counted time
    Timer.prototype.ms = function () {
        var f = this;
        if (!f.triggers.isStarted)
            return f.triggers.pausevalue;
        f.triggers.time = Date.now() - f.triggers.startpoint + f.triggers.counted;
        return f.triggers.time;
    };
    Timer.prototype.s = function () {
        var f = this;
        return round(f.ms() / 1000, 3);
    };
    //show counted time + left time since last checkpoint 
    Timer.prototype.i = function () {
        var f = this;
        var v = {};
        v.sec = f.s();
        v.delay = round(v.sec - f.triggers.checkpoint, 3); //v.delay uses new $time
        f.triggers.checkpoint = v.sec; //after v.delay, couse v.delay uses last $checkpoint
        v.replay = v.sec + " (+" + v.delay + ") sec";
        return v.replay;
    };
    //subscribe to timer
    Timer.prototype.subscribe = function (e) {
        var f = this;
        f.subscribeEvents.push(e);
    };
    return Timer;
}());
