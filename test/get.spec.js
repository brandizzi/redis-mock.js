sc = require('./sc')
sinon = require('sinon');

redis = sc.redis;

describe('Mocked "get" method', function() {
  beforeEach(sc.clearDatabase);

  it("should exist", function() {
    var client = redis.createClient();
    var value = client.get("key", redis.print);
	expect(value).toBe(true);    
	client.end();
  });

  it("should call callback", function() {
    var client = redis.createClient();
    var spy = sinon.spy();
    var value = client.get("key", spy);
    expect(spy.called).toBeTruthy();
	expect(value).toBe(true);    
	client.end();
  });

  it("should pass parameters to callback", function() {
    var client = redis.createClient();
    var value = client.get("key", function(err, data) {
        expect(err).toBeNull();
        expect(data).toBeNull();
    });
	expect(value).toBe(true);    
	client.end();
  });

  it("should fail on lists", function() {
    var client = redis.createClient();
    client.lpush('list', 'element');
    var value = client.get("list", function(err, data) {
        expect(err).toNotBe(null);
        expect(data).toBeUndefined();
    });
	expect(value).toBe(true);    
	client.end();
  });

  it("should not raise error if fail on lists", function() {
    var client = redis.createClient();
    client.lpush('list', 'element');
    var value = client.get("list");
    expect(value).toBe(true);    
	client.end();
  });
  
});
