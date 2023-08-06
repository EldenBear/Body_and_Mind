const { User, Post } = require('../models');
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
    allPostIds: async () => {
      try {
        const posts = await Post.find();
        return posts.map((post) => post._id);
      } catch (err) {
        console.error(err);
        throw new Error('Failed to fetch post ids');
      }
    },
    postId: async (_, __, context) => {
      const user = await User.findOne({ _id: context.user._id });
    },

    getPosts: async () => {
      return Post.find();
    },
    singleUserPosts: async (parent, { userId }) => {
      return Post.findOne({ _id: userId });
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

        console.log(`user:: ${user}`);

        console.log('content: ' + args.comment.content);

        const newComment = {
          content: args.comment.content,
        };

        console.log(`newComment: ${JSON.stringify(newComment)}`);

        if (user && user.comments) {
          console.log(`user.comments: ${user.comments}`);
          user.comments.push(newComment);
          await user.save();
          return newComment;
        } else {
          throw new Error('User or user comments not found');
        }
      } catch (err) {
        console.error(err);
      }
    },
    addPost: async (_, args, context) => {
      // Check if the user is logged in
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in');
      }

      console.log(`args: ${JSON.stringify(args)}`);
      // Get the logged-in user's ID from the context
      const userId = context.user._id;

      try {
        const newPost = await Post.create({
          userId: userId,
          postId: args.post.postId,
          postText: args.post.postText,
          imageURL: args.post.imageURL,
        });
        return newPost;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to create a new post');
      }
    },
  },
};

module.exports = resolvers;
