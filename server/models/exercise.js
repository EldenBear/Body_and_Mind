// models/exercise.js

const mongoose = require('mongoose');
const axios = require('axios');

// Define the schema for the "exercises" collection
const exerciseSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
  });

// Create a model based on the schema
const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;