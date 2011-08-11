var __lastClient = null, __showError = true;

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
      lpop : function(listKey, callback) {
        var list = this.__map[listKey], err = null;
        
        if (typeof list == "undefined" || list == null) {
          value = null;
        } else if (typeof list == "object") {
          value = list.pop();
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
