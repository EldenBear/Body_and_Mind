const { User } = require('../models');
const commentSchema = require('../models/commentSchema');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('comments');
      } else {
        throw new AuthenticationError('You need to be logged in');
      }
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('comments');
    },
  },

  Mutation: {
    register: async (parent, { username, password }) => {
      try {
        const newUser = await User.create({ username, password });
        const token = signToken(newUser);
        return { user: newUser, token };
      } catch (err) {
        console.error('Error during user registration:', err);
        throw new AuthenticationError('Registration failed inside resolvers');
      }
    },
    login: async (parent, { username, password }) => {
      try {
        const user = await User.findOne({ username });

        if (!user || !(await user.isCorrectPassword(password))) {
          throw new AuthenticationError('Incorrect credentials');
        }

        const token = signToken(user);

        return { token, user }; // Return back to the Client side
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('An error occurred during login');
      }
    },
    addBio: async (parent, args, context) => {
      try {
        console.log('%c' + 'Args: ', 'color: red' + args);
        return User.findOneAndUpdate(
          { _id: context.user._id },
          {
            $set: {
              username: args.bio.username,
              age: args.bio.age,
              aboutme: args.bio.aboutme,
              hobbies: args.bio.hobbies,
              gender: args.bio.gender,
              profilePicture: args.bio.profilePicture,
              activityLevel: args.bio.activityLevel,
            },
          },
          { new: true, runValidators: true }
        );
      } catch (err) {
        console.error(err);
        throw new AuthenticationError('Error occurred while updating the bio');
      }
    },
    addComment: async (parents, args, context) => {
      try {
        const user = await User.findById(context.user._id);
        if (!user) {
          throw new Error('User not found');
        }

        console.log('content: ' + args.comment.content);

        const newComment = {
          content: args.comment.content,
        };

        user.comments.push(newComment);
        await user.save();
        return newComment;
      } catch (err) {
        console.error(err);
      }
    },
  },
};

module.exports = resolvers;
