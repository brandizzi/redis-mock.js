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
});
