sc = require('./sc');
sinon = require('sinon');

redis = sc.redis;

describe('Mocked "lpush" method', function() {
  beforeEach(sc.clearDatabase);

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

  it("should fail on non-list", function() {
    var client = redis.createClient();
    client.set('nonlist', 'some string');
    var value = client.lpush('nonlist', 'element', function(err, data) {
        expect(err).toNotBe(null);
        expect(data).toBeUndefined();
    });
	expect(value).toBe(true);    
	client.get('nonlist', function (err, data) {
	    expect(err).toBe(null);
        expect(data).toEqual("some string");
	});
  });

  it("should not throw exception on non-list if no callback given", function() {
    var client = redis.createClient();
    client.set('nonlist', 'some string');
    client.lpush('nonlist');
  });

});
