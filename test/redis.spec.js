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
});
