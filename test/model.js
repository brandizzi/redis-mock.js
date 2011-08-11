redis = require('../redis-mock');
sinon = require('sinon');

describe('Mocked "???" method', function() {

  it("should exist", function() {
    var client = redis.createClient();
    var value = client.???
	expect(value).toBe(true);    
  });

  it("should call callback", function() {
    var client = redis.createClient();
    var spy = sinon.spy();
    var value = client.???, spy
    expect(spy.called).toBeTruthy();
	expect(value).toBe(true);    
  });

  it("should pass parameters to callback", function() {
    var client = redis.createClient();
    var value = client.???, function(???) {
        expect(err).toBeNull();
        expect(data).toBeNull();
    });
	expect(value).toBe(true);    
  });
});
