const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { axios } = require('axios'); //Still need api token? 
// Need the sign token utility when finsihed

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('comments');
      } else {
        throw new AuthenticationError();
      }
    },
  },
    exercises: async () => {
      try {
        const response = await axios.get('https://api-ninjas.com/api/exercises');
        return response.data;
      } catch (error) {
        console.error('Error fetching exercises from the external API:', error);
        throw new Error('Failed to fetch exercises from the external API.');
    }
  },

  Mutation: {
    register: async (parent, { name, email, password }) => {
        try {
          const newUser = await User.create({ name, email, password });
          //   const token = have to wait for token
          //   return { newUser, token };
        } catch (err) {
          console.error(err);
          throw new AuthenticationError();
        }
      },
  },
};

module.exports = resolvers;
