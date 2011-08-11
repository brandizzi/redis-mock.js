var __lastClient = null;

function createClient() {
  __lastClient =  {
      set : function(key, value, callback) {
        this.__map[key] = value;
        if (typeof callback == "function")
      	  callback(null, "OK");
        return true;
      },
      get : function(key, callback) {
        var value = this.__map[key];
        if (typeof value == "undefined") {
          value = null;
        }
        if (typeof callback == "function") {
      	  callback(null, value);
      	}
        return true;
      },
      incr : function(key, callback) {
        var value = this.__map[key];
        var err = null;
        if (typeof value == "undefined" || value == null) {
          value = this.__map[key] = 1
        } else if (typeof value == "number") {
          this.__map[key] = ++value;
        } else {
          value = undefined;
          err = __createError(
            'Error: ERR value is not an integer or out of range');
        }
        if (typeof callback == "function") {
      	  callback(err, value);
      	} else if (err) {
      	  throw err.message;
      	}
        return true;
      },
      lpush : function (list, element, callback) {
        var value = this.__map[list];
        var err = null;
        if (typeof value == "undefined" || value == null) {
          value = this.__map[list] = [];
        }
        if (typeof value == "object") {
          value.push(element);
        } else {
          value = undefined;
          err = __createError(
            'Error: ERR Operation against a key holding the wrong kind of value'
          );
        }
        
        if (typeof callback == "function") {
          callback(null, value.length);
        }
        return true;
      },      
      __map : {},
  };
  return __lastClient;
}

function lastClient() {
  return __lastClient;
}

function __createError(message, type, arguments, stack) {
  return { 
    message :  message, 
    type : type, 
    arguments : arguments,
    stack : stack
  };
}

if (exports) {
  exports.createClient = createClient
  exports.lastClient = lastClient
}
