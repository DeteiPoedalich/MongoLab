//Set of functions for easy work with mongojs

var moment = require("moment");
var mongojs = require("mongojs");
var js = require("libraryjs");

// —————————————————————— Document ——————————————————————

//Add new document
var docAdd = (param) => {
  
  var body;
  if (!param.notime) {
    var created = moment();
    body = {
      time: created.format("DD MMM YYYY, HH:mm:ss"),
      unix: created.unix()
    };
    Object.assign(body, param.json);
  } else body = param.json;

  param.ajax.db.collection(param.collection).insert(body);

  param.callback(false);

};

//Find document
var docFind = (param) => {
  
  param.ajax.db.collection(param.collection).findOne( param.search, param.callback );

};

//Get document
var docGet = (param) => {
  
  param.ajax.db.collection(param.collection).findOne({
    id: mongojs.ObjectId(param.id)
  }, param.callback );

};

//Remove document
var docRemove = (param) => {
  
  param.ajax.db.collection(param.collection).remove({
    id: mongojs.ObjectId(param.id)
  }, param.callback );

};

//Update document
var docUpdate = (param) => {

  param.ajax.db.collection(param.collection).update(
    param.search,
    { $set: param.json },
    { multi: true },
    param.callback
  );

};

//Remove all variables from document
var docClear = (param) => {

  //We can"t just delete all variable. At first we need to get the variables, which we will delete
  docGet({
    id: param.id,
    ajax: param.ajax,
    collection: param.collection,
    callback: (err, doc) => {
      if (err) {
        param.callback(err);
        return;
      }

      var trash = doc;
      if ( js.is(trash.param.id) ) delete trash.param.id;

      for(let name in trash) {
        trash[name] = "";
      }

      //If doc is empty then callback
      if (Object.keys(trash).length == 0) {
        param.callback(err); //err = false
        return;
      }

      //If doc isn"t empty then clear and callback
      param.ajax.db.collection(param.collection).findAndModify({
        query: {
          id: mongojs.ObjectId(param.id)
        },
        update: {
          $unset: trash
        }
      }, (err, doc, lastErrorObject) => {
        param.callback(err);
      });
    }
  });

};

//Replace document
var docReplace = (param) => {
  
  //The function change document param.id
  docRemove({
    id: param.id,
    ajax: param.ajax,
    collection: param.collection,
    callback: (err) => {
      if (err) {
        param.callback(err);
        return;
      }
      docAdd({
        json: param.json,
        ajax: param.ajax,
        collection: param.collection,
        callback: param.callback
      });
    }
  });

};

//Edit document
var docEdit = (param) => {
  
  //The function doesn"t change document param.id
  docClear({
    id: param.id,
    ajax: param.ajax,
    collection: param.collection,
    callback: (err) => {
      if (err) {
        param.callback(err);
        return;
      }

      param.ajax.db.collection(param.collection).findAndModify({
        query: {
          id: mongojs.ObjectId(param.id)
        },
        update: {
          $set: param.json
        }
      }, (err, doc, lastErrorObject) => {
        param.callback(err);
      })
    }
  });

};

// —————————————————————— Collection ——————————————————————

//Get all document in collection
var colGet = (param) => {
  
  param.ajax.db.collection(param.collection).find( param.callback );

};

//Create new collection
var colAdd = (param) => {
  
  param.ajax.db.createCollection(param.collection, {}, param.callback );

};

//Remove collection
var colRemove = (param) => {
  
  param.ajax.db.collection(param.collection).drop( param.callback );

};

//Get all collections names
var getCollectionNames = (param) => {
  
  param.ajax.db.getCollectionNames( param.callback );

};

module.exports = {
  doc: {
    add:      docAdd,
    get:      docGet,
    find:     docFind,
    remove:   docRemove,
    replace:  docReplace,
    clear:    docClear,
    edit:     docEdit,
    update:   docUpdate
  },
  collection: {
    add:      colAdd,
    get:      colGet,
    remove:   colRemove,
    all:      getCollectionNames
  }
};