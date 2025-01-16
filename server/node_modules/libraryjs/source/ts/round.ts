//Superior round function
function round(n:number, e:number):number {
  var p:number;
  p = Math.pow(10,e);
  return Math.round(n*p)/p;
}