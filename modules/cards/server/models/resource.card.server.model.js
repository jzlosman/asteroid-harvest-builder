'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ResourceSchema = new Schema({
  type: {
    type: String,
    default: 'Resource'
  },
  label: String,
  img: String,
  energies: [{
    type: String
    // type: Schema.ObjectId,
    // ref: 'Energy'
  }],
  amount: {
    type: Number,
    default: 1
  }
});

mongoose.model('Resource', ResourceSchema, 'cards');
