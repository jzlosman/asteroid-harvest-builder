'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Asteroid = mongoose.model('Asteroid'),
  Action = mongoose.model('Action'),
  Character = mongoose.model('Character'),
  Contract = mongoose.model('Contract'),
  Resource = mongoose.model('Resource'),
  Card = mongoose.model('Card'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

var getSchema = function(type) {
  console.log('type is', type);
  switch (type) {
    case 'Asteroid':
      return Asteroid;
    case 'Action':
      return Action;
    case 'Character':
      return Character;
    case 'Contract':
      return Contract;
    case 'Resource':
      return Resource;
    default:
      return Card;
  }
};

/**
 * Create an article
 */
exports.create = function (req, res) {
  var Schema = getSchema(req.body.type);
  var model = new Schema(req.body);
  if (typeof(model.energies) == 'string') {
    model.energies = model.energies.split(',');
  }
  model.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(model);
    }
  });
};


/**
 * Show the current article
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var card = req.card ? req.card.toJSON() : {};

  res.json(card);
};


/**
 * Update an article
 */
exports.update = function (req, res) {
  var card = req.card;
  card.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(card);
    }
  });
};

/**
 * Delete an article
 */
exports.delete = function (req, res) {
  var card = req.card;

  card.remove(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(card);
    }
  });
};

/**
 * List of Articles
 */
exports.list = function (req, res, next) {
  var Schema = getSchema(req.query.type);
  if (req.query.type !== undefined) {
    // Schema.find().populate('energies').exec(function (err, cards) {
    Schema.find({ type: req.query.type }).exec(function (err, cards) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(cards);
      }
    });
  } else {
    // Schema.find().populate('energies').exec(function (err, cards) {
    Schema.find().exec(function (err, cards) {
      if (err) {
        return res.status(400).send({
          message: errorHandler.getErrorMessage(err)
        });
      } else {
        res.json(cards);
      }
    });
  }

};

/**
 * Article middleware
 */
exports.cardByID = function (req, res, next, id) {


  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Card is invalid'
    });
  }

  Card.findById(id).exec(function (err, card) {
    if (err) {
      return next(err);
    } else if (!card) {
      return res.status(404).send({
        message: 'No card with that identifier has been found'
      });
    }
    var Schema = getSchema(card.type);
    req.card = new Schema(card);
    next();
  });
};
