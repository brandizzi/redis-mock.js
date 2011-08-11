redis = require('../redis-mock');
sinon = require('sinon');

describe('Mocked "get" method', function() {

  it("should exist", function() {
    var client = redis.createClient();
    var value = client.get("key");
	expect(value).toBe(true);    
  });

  it("should call callback", function() {
    var client = redis.createClient();
    var spy = sinon.spy();
    var value = client.get("key", spy);
    expect(spy.called).toBeTruthy();
	expect(value).toBe(true);    
  });

  it("should pass parameters to callback", function() {
    var client = redis.createClient();
    var value = client.get("key", function(err, data) {
        expect(err).toBeNull();
        expect(data).toBeNull();
    });
	expect(value).toBe(true);    
  });

  it("should retrieve set value", function() {
    var client = redis.createClient();
    client.set("key", "value");
    var value = client.get("key", function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual("value");
    });
	expect(value).toBe(true);    
  });
});
