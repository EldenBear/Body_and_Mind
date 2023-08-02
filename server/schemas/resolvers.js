const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const axios = require('axios');
// const request = require('request');
//Still need api token?
// Need the sign token utility when finsihed

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('comments');
      } else {
        throw new AuthenticationError('You need to be logged in');
      }
    },
  },
  // exercises: async (_, { muscle }) => {
  //   try {
  //     const response = await axios.get({
  //       url: `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`,
  //       headers: { 'X-Api-Key': '' },
  //     });
  //     return { response };
  //   } catch (error) {
  //     console.error('Error fetching exercises from the external API:', error);
  //     throw new Error('Failed to fetch exercises from the external API.');
  //   }
  // },

  Mutation: {
    register: async (parent, { username, password }) => {
      try {
        const newUser = await User.create({ username, password });
        const token = signToken(newUser);
        return { newUser, token };
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Registration failed inside resolvers');
      }
    },
  },
};

module.exports = resolvers;
