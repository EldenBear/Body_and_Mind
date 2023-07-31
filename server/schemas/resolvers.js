const { User } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
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
  register: async (_, { name, email, password }) => {
    try {
      const newUser = User.create({ name, email, password });
      //   const token = have to wait for token
      //   return { newUser, token };
    } catch (err) {
      console.error(err);
      throw new AuthenticationError();
    }
  },

  Mutation: {},
};

module.exports = resolvers;
