'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Article Schema
 */
var CharacterSchema = new Schema({
  type: {
    type: String,
    default: 'Character'
  },
  label: String,
  img: String,
  energies: [{
    type: String
    // type: Schema.ObjectId,
    // ref: 'Energy'
  }],
  stats: {
    speed: Number,
    mining: Number,
    attack: Number,
    defense: Number
  },
  text: String,
  abilityFormula: String,
  abilityType: String
});

mongoose.model('Character', CharacterSchema, 'cards');
