redis = require('./sc').redis;
sinon = require('sinon');

describe('Mocked "lrange" method', function() {
  beforeEach(function() {
    redis.createClient().flushall();
  });

  it("should exist", function() {
    var client = redis.createClient();
    var value = client.lrange('list', 1, 2);
	expect(value).toBe(true);    
  });

  it("should call callback", function() {
    var client = redis.createClient();
    var spy = sinon.spy();
    var value = client.lrange('list',  1, 2, spy);
    expect(spy.called).toBeTruthy();
	expect(value).toBe(true);    
  });

  it("should pass parameters to callback", function() {
    var client = redis.createClient();
    var value = client.lrange('list',  1, 2, function(err, data) {
        expect(err).toBeNull();
        expect(data).toBeNull();
    });
	expect(value).toBe(true);    
  });

  it("should pass range to callback", function() {
    var client = redis.createClient();
    for (var i = 0; i < 4; i++) {
      client.lpush('list', "element"+i);
    }
    var value = client.lrange('list',  1, 2, function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual(["element1", "element2"]);
    });
	expect(value).toBe(true);    
  });

  it("should consider a negative index -x as meaning <LENGTH>-x", function() {
    var client = redis.createClient();
    for (var i = 0; i < 4; i++) {
      client.lpush('list', "element"+i);
    }
    var value = client.lrange('list',  1, -1, function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual(["element1", "element2", "element3"]);
    });
	expect(value).toBe(true);    
    client.lrange('list',  1, -2, function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual(["element1", "element2"]);
    });
    client.lrange('list',  -3, -2, function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual(["element1", "element2"]);
    });
  });
});
