redis = require('../redis-mock');
sinon = require('sinon');

describe('Mocked "lpush" method', function() {

  it("should exist", function() {
    var client = redis.createClient();
    var value = client.lpush('list', 'element');
	expect(value).toBe(true);    
  });

  it("should call callback", function() {
    var client = redis.createClient();
    var spy = sinon.spy();
    var value = client.lpush('list', 'element', spy);
    expect(spy.called).toBeTruthy();
	expect(value).toBe(true);    
  });

  it("should pass parameters to callback", function() {
    var client = redis.createClient();
    var value = client.lpush('list', 'element', function(err, data) {
        expect(err).toBeNull();
        expect(data).toBe(1);
    });
	expect(value).toBe(true);
  });

  it("should return length of the list", function() {
    var client = redis.createClient();
    var value = client.lpush('list', 'element1', function(err, data) {
        expect(err).toBeNull();
        expect(data).toBe(1);
    });
    var value = client.lpush('list', 'element2', function(err, data) {
        expect(err).toBeNull();
        expect(data).toBe(2);
    });
	expect(value).toBe(true);
  });

});
