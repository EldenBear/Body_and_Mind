// Models/index.js

const mongoose = require ('mongoose');
const users = require('./users');
const exercise = require('./exercise');
const comments = require('./comments')

module.exports = { users, exercise, comments };
