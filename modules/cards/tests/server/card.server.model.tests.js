'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
  mongoose = require('mongoose'),
  Resource = mongoose.model('Resource');

/**
 * Globals
 */
var resource;

/**
 * Unit tests
 */
describe('Resource Card Model Unit Tests:', function () {

  beforeEach(function (done) {
    resource = new Resource({
      energy: 'Xa',
      amount: 2
    });
    done();
  });

  describe('Method Save', function () {
    it('should be able to save without problems', function (done) {
      this.timeout(10000);
      return resource.save(function (err) {
        should.not.exist(err);
        done();
      });
    });
  });

  afterEach(function (done) {
    Resource.remove().exec(function () {
      done();
    });
  });
});
