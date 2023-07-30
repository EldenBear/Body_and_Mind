const mongoose = require('mongoose');

mongoose
  .connect(
    'mongodb+srv://tg1489:RUBYruby2808!!@cluster0.hr6x6af.mongodb.net/bodyandmind'
  )
  .then(() => {
    console.log('Connected to MongoDB database!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

module.exports = mongoose.connection;
