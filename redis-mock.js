var __lastClient = null, __showError = false;

function createClient() {
  __lastClient =  {
      set : function(key, value, callback) {
        this.__map[key] = value;
        if (typeof callback == "function")
      	  callback(null, "OK");
        return true;
      },
      get : function(key, callback) {
        var value = this.__map[key], err = null;
        
        if (typeof value == "undefined") {
          value = null;
        }
        if (typeof value == "object" && value != null) {
          value = undefined;
          err = __createError(
            'Error: Error: ERR Operation against a key holding the wrong kind of value');
        }
        if (typeof callback == "function") {
      	  callback(err, value);
      	} else if (err) {
      	  __printError(err);
      	}
        return true;
      },
      incr : function(key, callback) {
        var value = this.__map[key];
        var err = null;
        if (typeof value == "undefined" || value == null) {
          value = this.__map[key] = 0;
        }
        if (typeof value == "number") {
          this.__map[key] = ++value;
        } else {
          value = undefined;
          err = __createError(
            'Error: ERR value is not an integer or out of range');
        }
        if (typeof callback == "function") {
      	  callback(err, value);
      	} else if (err) {
      	  __printError(err);
      	}
        return true;
      },
      lpush : function (listName, element, callback) {
        var value = 0, 
          list = this.__map[listName],
          err = null;
        if (typeof list == "undefined" || list == null) {
           list = this.__map[listName] = [];
        }
        if (list.constructor == Array) {
          list.push(element);
          value = list.length;
        } else {
          value = undefined;
          err = __createError(
            'Error: ERR Operation against a key holding the wrong kind of value'
          );
        }
        
        if (typeof callback == "function") {
          callback(err, value);
        }
        return true;
      },      
      lpop : function(listName, callback) {
        var value = null, list = this.__map[listName], err = null;
        if (typeof list == "undefined" || list == null) {
          value = null;
        } else if (list.constructor == Array) {
          if (list.length != 0) {
            value = list.pop();
          } else {
            value = null;
          }
        } else {
          value = undefined;
          err = __createError(
            'Error: ERR Operation against a key holding the wrong kind of value'
          );
        }
        if (typeof callback == "function") {
      	  callback(err, value);
      	} else if (err) {
      	  __printError(err);
      	}
        return true;
      },
      llen : function(listName, callback) {
        var value = null, list = this.__map[listName], err = null;
        
        if (typeof list == "undefined" || list == null) {
          value = null;
        } else if (list.constructor == Array) {
          value = list.length;
        } else {
          value = undefined;
          err = __createError(
            'Error: ERR Operation against a key holding the wrong kind of value'
          );
        }
        if (typeof callback == "function") {
          callback(err, value);
        } else {
      	  __printError(err);
        }
        return true;
      },
      lrange : function(listName, start, end, callback) {
        var value = null, list = this.__map[listName], err = null;
        if (typeof list == "undefined" || list == null) {
          value = null;
        } else if (list.constructor == Array) {
          value = list.slice(start, end+1);
        }
        if (typeof callback == "function") {
          callback(err, value);
        } else {
      	  __printError(err);
        }
        return true;
      },
      flushall : function () {
        return true;
      },
      close : function() {
        return true;
      },
      __map : {},
  };
  return __lastClient;
}

function lastClient() {
  return __lastClient;
}

function showError(value) {
  __showError = value;
}


function __createError(message, type, arguments, stack) {
  return { 
    message :  message, 
    type : type, 
    arguments : arguments,
    stack : stack
  };
}

function __printError(error) {
  if (__showError) {
    console.log('node_redis: no callback to send error: ' + error.message);
  }
}
if (exports) {
  exports.createClient = createClient
  exports.lastClient = lastClient
  exports.showError = showError;
}
