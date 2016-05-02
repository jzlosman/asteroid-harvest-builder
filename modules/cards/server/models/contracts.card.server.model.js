'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var ContractSchema = new Schema({
  type: {
    type: String,
    default: 'Contract'
  },
  label: String,
  img: String,
  energies: [{
    type: String
    // type: Schema.ObjectId,
    // ref: 'Energy'
  }],
  turns: Number,
  value: Number,
  valueFormula: {
    type: String,
    default: 'x'
  },
  contractFormula: String
});

mongoose.model('Contract', ContractSchema, 'cards');
