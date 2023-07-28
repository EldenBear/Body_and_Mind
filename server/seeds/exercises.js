// seed-exercises.js

const mongoose = require('mongoose');
const Exercise = require('./models/exercise');
const axios = require('axios');

// Function to fetch exercises from the API
async function fetchExercisesFromAPI() {
  try {
    const response = await axios.get('https://api-ninjas.com/api/exercises');
    return response.data;
  } catch (error) {
    console.error('Error fetching exercises:', error.message);
    return [];
  }
}

// Function to seed the exercises to the database
async function seedExercises() {
  try {
    // Connect to your MongoDB database (replace with your MongoDB URI)
    await mongoose.connect('mongodb://localhost:27017/your_database_name_tbd', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Fetch exercises from the API
    const exercises = await fetchExercisesFromAPI();

    // Insert exercises into the database
    await Exercise.insertMany(exercises);

    console.log('Exercises seeded successfully!');
  } catch (error) {
    console.error('Error seeding exercises, Run 10 miles:', error);
  } finally {
    // Close the database connection and exit the process
    mongoose.connection.close();
    process.exit(0);
  }
}

seedExercises();