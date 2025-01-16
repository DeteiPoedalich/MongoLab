# mongoshell
### v1.0.0 ( last update: 10 june 2017 )

Set of functions for easy work with mongojs.

### Install
```javascript
npm i mongoshell --save
```

### Node.js
```javascript
var mongoshell = require("mongoshell");
```

### Documentation
Add new document
```javascript
mongoshell.doc.add({
  ajax: ajax,
  collection: "users",
  json: {
    username: "Li",
    email: "returninfinity8@gmail.com"
  },
  callback: (err) => {
    if (err) {
      ajax.error();
      return;
    }
    ajax.success();
  }
});
```

### New documentation coming soon ...
```javascript
//U mad?
```