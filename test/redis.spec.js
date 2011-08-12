redis = require('./sc').redis;
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
