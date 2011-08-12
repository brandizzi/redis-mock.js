sc = require('./sc');
sinon = require('sinon');

redis = sc.redis;

describe('Mocked "set" method', function() {
  beforeEach(sc.clearDatabase);

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
  
  it("should pass parameters to callback", function () {
    var client = redis.createClient();
    var value = client.set("key", "value", function(err, data) {
        expect(err).toBeNull();
        expect(data).toEqual("OK");
    });
	expect(value).toBe(true);
  });

  it("should update value", function () {
    var client = redis.createClient();
    client.set("key", "1st");
    client.get("key", function (err, data) {
      expect(err).toBeNull();
      expect(data).toBe("1st");
    });
    client.set("key", "2nd");
    client.get("key", function (err, data) {
      expect(err).toBeNull();
      expect(data).toBe("2nd");
    });
  });

  it("should override lists", function() {
    var client = redis.createClient();
    client.lpush('list', 'element');
    var value = client.set("list", "value", function(err, data) {
        expect(err).toBe(null);
        expect(data).toEqual("OK");
    });
	expect(value).toBe(true);    
  });


});

