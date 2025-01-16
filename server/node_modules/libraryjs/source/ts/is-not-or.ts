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