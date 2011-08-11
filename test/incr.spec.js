redis = require('../redis-mock');
sinon = require('sinon');

describe('Mocked "incr" method', function() {
  it("should exist", function() {
    var client = redis.createClient();
    var value = client.incr("key");
	expect(value).toBe(true);    
  });
  it("should call callback", function() {
    var client = redis.createClient();
    var spy = sinon.spy();
    var value = client.incr("key", spy);
    expect(spy.called).toBeTruthy();
	expect(value).toBe(true);    
  });
  it("should pass parameters to callback", function() {
    var client = redis.createClient();
    var value = client.incr("key", function(err, data) {
        expect(err).toBeNull();
        expect(data).toBe(1);
    });
	expect(value).toBe(true);    
  });
  it("should increment some value", function() {
    var client = redis.createClient();
    client.get("key", function(err, data) {
        expect(err).toBeNull();
        expect(data).toBeNull();
    });

    var value = client.incr("key", function(err, data) {
        expect(err).toBeNull();
        expect(data).toBe(1);
    });
	expect(value).toBe(true);
    client.get("key", function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual(1);
    });
	value = client.incr("key", function(err, data) {
        expect(err).toBeNull();
        expect(data).toBe(2);
    });
	expect(value).toBe(true);
    client.get("key", function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual(2);
    });
  });
  it("should fail on non-integers", function() {
    var client = redis.createClient();
    client.set("key", "nonint");
    var value = client.incr("key", function(err, data) {
        expect(err).toNotBe(null);
        expect(data).toBeUndefined();;
    });
	expect(value).toBe(true);    
  });
  it("should raise error on non-integers if no callback provided", function() {
    var client = redis.createClient();
    client.set("key", "nonint");
    try {
      client.incr("key");
      fail();
    } catch (err) { }
  });

});

