redis = require('../redis-mock');
sinon = require('sinon');

describe('Mocked "lpop" method', function() {

  it("should exist", function() {
    var client = redis.createClient();
    client.lpush('list', 'element');
    var value = client.lpop('list');
	expect(value).toBe(true);    
  });

  it("should call callback", function() {
    var client = redis.createClient();
    var spy = sinon.spy();
    client.lpush('list', 'element');
    var value = client.lpop('list', spy);
    expect(spy.called).toBeTruthy();
	expect(value).toBe(true);    
  });

  it("should pass parameters to callback", function() {
    var client = redis.createClient();
    client.lpush('list', 'element');
    var value = client.lpop('list', function(err, data) {
        expect(err).toBeNull();
        expect(data).toBe('element');
    });
	expect(value).toBe(true);    
  });

  it("should pop last pushed element", function() {
    var client = redis.createClient();
    client.lpush('list', 'element1');
    client.lpush('list', 'element2');
    var value = client.lpop('list', function(err, data) {
        expect(err).toBeNull();
        expect(data).toBe('element2');
    });
    var value = client.lpop('list', function(err, data) {
        expect(err).toBeNull();
        expect(data).toBe('element1');
    });
	expect(value).toBe(true);    
  });

  it("should fail on non-list", function() {
    var client = redis.createClient();
    client.set('nonlist', 'some string');
    var value = client.lpop('nonlist', function(err, data) {
        expect(err).toNotBe(null);
        expect(data).toBeUndefined();
    });
	expect(value).toBe(true);    
  });

  it("should not throw exception on non-list if no callback given", function() {
    var client = redis.createClient();
    client.set('nonlist', 'some string');
    client.lpop('nonlist');
  });

  it("should work on keys which are not set", function() {
    var client = redis.createClient();
    client.lpush('nolist', 'element');
    var value = client.lpop('list', function(err, data) {
        expect(err).toBeNull();
        expect(data).toBeNull();
    });
	expect(value).toBe(true);    
  });

  it("should work on keys which are not set - and not set them", function() {
    var client = redis.createClient();
    client.lpush('nolist', 'element');
    var value = client.lpop('list', function(err, data) {
        expect(err).toBeNull();
        expect(data).toBeNull();
    });
	expect(value).toBe(true);    
	client.set('nolist', 'a string, actually', function (err, data) {
        expect(err).toBeNull();
        expect(data).toEqual("OK");
	});
  });
});
