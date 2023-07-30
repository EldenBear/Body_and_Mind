const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const { ageValidator } = require('../utils/ageValidator');
const commentSchema = require('./commentSchema');

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    unique: true,
    require: true,
    match: [/.+@.+\..+/, 'Must use a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minlength: 9, // Password must be at least 9 characters long
  },
  age: {
    type: Number,
    validate: {
      validator: ageValidator,
      message: 'Age must be 18 or older',
    },
  },
  aboutme: {
    type: String,
    max: 280,
  },
  hobbies: {
    type: String,
    require: false,
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'non-binary', 'Prefer not to say'],
  },
  profilePicture: {
    type: String,
  },
  activityLevel: {
    type: String,
    enum: ['Sedentary', 'Active', 'Social Active', 'Very Active'],
  },
  comments: [commentSchema],
});

// Mongoose middleware that will hash the user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next(); // Used so that the password can fall through the pipeline and continue to get saved in the db
});

const User = model('User', userSchema);

module.exports = User;
