# ajaxmanager
### v1.0.1 ( last update: 10 june 2017 )

Manager to simplify the receiving and responding of post requests.

### Install
```javascript
npm i ajaxmanager --save
```

### Node.js
```javascript
var ajaxmanager = require("ajaxmanager");
```

### Initialization
```javascript
var ajax = ajaxmanager.create();
ajax.set({
  req: req,
  res: res
});
```

### DB
```javascript
ajax.set({ db: db });
```

### Errors
Set error and end session
```javascript
ajax.error("wrong ajax");
```

Add more that one error
```javascript
for(let msg of msgs) {
  if (msg.failed) {
    ajax.adderror(msg);
  }
}
```

### Completion
When everything is done
```javascript
ajax.success();
```

Send file
```javascript
ajax.reply(file);
```

Send file instead everything else
```javascript
ajax.send(file);
```