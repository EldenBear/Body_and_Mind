// config/connection.js

const mongoose = require('mongoose');

// Replace 'your_database_uri' with your actual MongoDB connection URI
const databaseURI = 'mongodb://localhost:27017/your_database_name_tbd';

// Connect to the MongoDB database
mongoose.connect(databaseURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB database!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

  module.exports = mongoose.connection;




