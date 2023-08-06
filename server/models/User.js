const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const ageValidator = require('../utils/ageValidator');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8, // Password must be at least 8 characters long
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
    required: false, // "require" should be "required"
  },
  gender: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  activityLevel: {
    type: String,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    ref: "Post"
  }],
});

// Mongoose middleware that will hash the user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
  if (!passwordPattern.test(this.password)) {
    return next(
      new Error(
        'Password must be at least 8 characters long and contain at least one capital letter and one special character.'
      )
    );
  }

  next(); // Used so that the password can fall through the pipeline and continue to get saved in the db
});

// Login password compare
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;
