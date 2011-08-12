redis = require('./sc').redis;
sinon = require('sinon');

describe('Mocked "LLEN" method', function() {

  it("should exist", function() {
    var client = redis.createClient();
    var value = client.llen('list');
	expect(value).toBe(true);    
  });

  it("should call callback", function() {
    var client = redis.createClient();
    var spy = sinon.spy();
    var value = client.llen('list', spy);
    expect(spy.called).toBeTruthy();
	expect(value).toBe(true);    
  });

  it("should pass parameters to callback", function() {
    var client = redis.createClient();
    var value = client.llen('list', function(err, data) {
        expect(err).toBeNull();
        expect(data).toBeNull();
    });
	expect(value).toBe(true);    
  });

  it("should return length of list", function() {
    var client = redis.createClient();
    client.lpush('list', 'element1');
    var value = client.llen('list', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual(1);
    });
	expect(value).toBe(true);    
    client.lpush('list', 'element2');
    value = client.llen('list', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual(2);
    });
    client.lpop('list');
    value = client.llen('list', function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual(1);
    });
	expect(value).toBe(true);    
  });

  it("should return null on non-existent list", function() {
    var client = redis.createClient();
    var value = client.llen('nonexistentlist', function(err, data) {
        expect(err).toBeNull();
        expect(data).toBeNull()
    });
	expect(value).toBe(true);    
  });

  it("should fail on non-lists", function() {
    var client = redis.createClient();
    client.set('nonlist', 'a string');
    var value = client.llen('nonlist', function(err, data) {
        expect(err).toNotBe(null);
        expect(data).toBeUndefined();
    });
	expect(value).toBe(true);    
  });
});
