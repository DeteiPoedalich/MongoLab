var js = require("libraryjs");

class AjaxManager {

  constructor() {
    var f = this;

    f.param = {};
    f.param.isDb = false;
    f.param.isRes = false;
    f.param.isReq = false;

    f.export = {};

    f.errors = new js.Errors();
    f.endEvents = new js.Events();
  }

  set(param) {
    var f = this;

    if (js.is(param.db)) f.setdb(param.db);
    if (js.is(param.res)) f.setres(param.res);
    if (js.is(param.req)) f.setreq(param.req);
  }

  setdb(db) {
    var f = this;

    f.db = db;
    f.isDb = true;
  }

  setreq(req) {
    var f = this;

    f.req = req;
    if ( js.is(f.req.body) ) f.import = f.req.body;
    f.isReq = true;
  }

  setres(res) {
    var f = this;

    f.res = res;
    f.isRes = true;
  }

  onend(event) {
    var f = this;

    return f.endEvents.push(event);
  }

  error(msg, code) {
    var f = this;

    f.adderror(msg, code);
    f.end();
  }
  adderror(msg, code) {
    var f = this;

    console.log("[ERROR]: " + msg);
    f.errors.addError(msg, code);
  }

  success() {
    var f = this;
    f.end();
  }

  send(pkg) {
    var f = this;

    f.export = pkg;
    f.close();
  }

  reply(pkg) {
    var f = this;

    f.export.pkg = pkg;
    f.end();
  }

  end() {
    var f = this;

    if (f.errors.exists)
    Object.assign(f.export, f.errors.exportErrors());

    f.close();
  }

  close() {
    var f = this;

    if (!f.isRes) {
      console.log("[ERROR]: ajax response isn't set");
      return;
    }

    f.endEvents.run();
    f.res.send(f.export);
    if (f.isDb) f.db.close();
  }

}

function create() {
  return new AjaxManager();
}

module.exports = {
  body: AjaxManager,
  create: create
};