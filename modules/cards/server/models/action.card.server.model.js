'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ActionSchema = new Schema({
  type: {
    type: String,
    default: 'Action'
  },
  label: String,
  img: String,
  energies: [{
    type: String
    // type: Schema.ObjectId,
    // ref: 'Energy'
  }],
  actionType: String,
  targetType: String,
  actionFormula: String,
  cost: Number,
  requires: Number,
  text: String
});

mongoose.model('Action', ActionSchema, 'cards');
