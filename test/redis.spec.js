redis = require('../redis-mock');
sinon = require('sinon');

describe('Redis mock library', function() {
  it("should have a createClient() function", function() {
    expect(typeof redis.createClient).toEqual("function");
  });
});

describe('createClient()', function() {
  it("should create client", function() {
    var client = redis.createClient();
    expect(typeof client).toEqual("object");
  });
  it("should store the client and get it through 'lastClient()'", function() {
    var client1 = redis.createClient();
    expect(client1).toBe(redis.lastClient())
    var client2 = redis.createClient();
    expect(client1).toNotBe(client2);
    expect(client1).toNotBe(redis.lastClient())
    expect(client2).toBe(redis.lastClient())
  });

});

describe('Mocked "set" method', function() {
  it("should exist", function() {
    var client = redis.createClient();
    var value = client.set("key", "value");
	expect(value).toBe(true);    
  });
  it("should call callback", function() {
    var client = redis.createClient();
    var spy = sinon.spy();
    var value = client.set("key", "value", spy);
    expect(spy.called).toBeTruthy();
	expect(value).toBe(true);    
  });  
});

describe('Mocked "set" method', function() {
  it("should exist", function() {
    var client = redis.createClient();
    var value = client.set("key", "value");
	expect(value).toBe(true);    
  });
  it("should call callback", function() {
    var client = redis.createClient();
    var spy = sinon.spy();
    var value = client.set("key", "value", spy);
    expect(spy.called).toBeTruthy();
	expect(value).toBe(true);    
  });
  it("should pass parameters to callback", function() {
    var client = redis.createClient();
    var value = client.set("key", "value", function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual("OK");
    });
	expect(value).toBe(true);    
  });
});

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

});
