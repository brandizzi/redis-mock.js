var __lastClient = null, __showError = false;

var database = {}

function RedisClient() {
  if (! this instanceof arguments.callee) {
    return new RedisClient()
  }
}
RedisClient.prototype =  {
  set : function(key, value, callback) {
    database[key] = value;
    if (typeof callback == "function")
  	  callback(null, "OK");
    return true;
  },
  get : function(key, callback) {
    var value = database[key], err = null;
    
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
    var value = database[key];
    var err = null;
    if (typeof value == "undefined" || value == null) {
      value = database[key] = 0;
    }
    if (typeof value == "number") {
      database[key] = ++value;
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
      list = database[listName],
      err = null;
    if (typeof list == "undefined" || list == null) {
       list = database[listName] = [];
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
    var value = null, list = database[listName], err = null;
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
    var value = null, list = database[listName], err = null;
    
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
    var value = null, list = database[listName], err = null;
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
    database = {};
    return true;
  },
  close : function() {
    return true;
  }
};

function createClient() {
  __lastClient = new RedisClient();
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
  exports.showError = showError;
}
