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