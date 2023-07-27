// models/users.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
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
        Min: 18,
    },
    aboutme: {
        type:String,
        Min: 280,
    },
    hobbies: {
        type: String,
        require: false,
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'non-binary', 'Prefer not to say']
    },
    profilePicture:{
        type: String,
    },
    activityLevel: {
        type: String,
        enum: ['Sedentary', 'Active', 'Social Active', 'Very Active']
    },
});

const Users = mongoose.model('Users', userSchema)