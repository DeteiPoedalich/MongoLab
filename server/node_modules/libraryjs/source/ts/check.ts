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