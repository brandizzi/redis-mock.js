// For testing development redis-mock, use
//  path = './redis-mock';
// For testing global redis-mock, use
//  path = 'redis-mock';
// For running tests againstl redis, use:
//  path = 'redis';
var path = '../redis-mock';
var redis = require(path);

var clearDatabase = function() {
  redis.createClient().flushall();
}
exports.redis = redis;
exports.clearDatabase = clearDatabase;
