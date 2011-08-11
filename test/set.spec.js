redis = require('../redis-mock');
sinon = require('sinon');

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

