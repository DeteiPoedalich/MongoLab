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