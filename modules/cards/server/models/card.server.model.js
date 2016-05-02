'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var CardSchema = new Schema({
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
  }]
});

mongoose.model('Card', CardSchema, 'cards');
