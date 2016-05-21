'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Game Schema
 */
var GameSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill Game name',
    trim: true
  },
  new: {
    type: Boolean,
    default: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  players: [{
    hero: String,
    user: {
      type: Schema.ObjectId,
      ref: 'User'
    }
  }]
});

mongoose.model('Game', GameSchema);
