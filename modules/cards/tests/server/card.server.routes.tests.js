'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Resource = mongoose.model('Resource'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  card;

/**
 * Article routes tests
 */
describe('Card CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });


  it('should be able to create a resource card as a guest', function (done) {
    // Save a new card
    var resource = { energy: 'Py', amount: 3 };
    agent.post('/api/cards/Resource')
      .send(resource)
      .expect(200)
      .end(function (saveErr, saveRes) {
        // Handle card save error
        if (saveErr) {
          return done(saveErr);
        }

        // Get a list of cards
        agent.get('/api/cards', { type: "Resource" })
          .end(function (getErr, getRes) {
            // Handle card save error
            if (getErr) {
              return done(getErr);
            }

            // Get cards list
            var cards = getRes.body;

            // Set assertions
            (cards[0].type).should.equal('Resource');
            // Call the assertion callback
            done();
          });
      });
  });
  afterEach(function (done) {
    User.remove().exec(function () {
      Resource.remove().exec(done);
    });
  });
});
