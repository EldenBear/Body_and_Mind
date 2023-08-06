const { User, Post, Comment } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (_, __, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
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
      const posts = await Post.find();
      const userData = await User.find();

      const postPayload = [];
      posts.forEach(post => {
        const user = userData.filter(x => post.userId.equals(x._id))[0];

        const payload = {
          _id: post._id,
          userId: post.userId,
          username: user.username,
          profilePicture: user.profilePicture,
          activityLevel: user.activityLevel,
          postText: post.postText,
          imageURL: post.imageURL,
          comments: post.comments
        };

        postPayload.push(payload);
      });

      return postPayload;
    },
    getPostsByUsername: async (parent, { username }) => {
      const result = await User.findById( {username} );
      console.log(result);
      return result.posts;
    },
    getCommentsByPostId: async (parent, {postId}) => {
      if(postId == null){
        return [];
      }

      try {
        const post = await Post.findOne({_id: postId});
        if(!post){
          return [];
        }

        if(!post.comments) {
          return [];
        }

        const commentsData = await Comment.find();
        const userData = await User.find();
        const comments = commentsData.filter(x => post.comments.includes(x.id));
        const commentPayload = [];
        comments.forEach(comment => {
          const user = userData.filter(x => comment.userId.equals(x._id))[0];

          const payload = {
            _id: comment._id,
            content: comment.content,
            username: user.username,
            profilePicture: user.profilePicture,
            activityLevel: user.activityLevel
          };

          commentPayload.push(payload);
        })

      return commentPayload;
      } catch(err) {
        console.log(err);
      }
      

    },
    singleUserPosts: async (parent, { userId }) => {
      return Post.findOne({ _id: userId });
    },
    user: async (parent, { username }) => {
      return User.findOne({ username });
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
      console.log("???");
      try {
        const post = await Post.findOne({_id: args.postId});
        if (!post) {
          throw new Error('Post not found');
        }

        console.log(context.user);
        const newComment = await Comment.create({
          content: args.comment.content,
          userId: context.user._id,
        })

        post.comments.push(newComment._id);
        await post.save();
        return newComment;
      } catch (err) {
        console.error(err);
      }
    },
    addPost: async (_, args, context) => {
      console.log("adding");
      // Check if the user is logged in
      if (!context.user) {
        throw new AuthenticationError('You need to be logged in');
      }

      // Get the logged-in user's ID from the context
      const userId = context.user._id;

      try {
        const newPost = await Post.create({
          userId: userId,
          postText: args.post.postText,
          imageURL: args.post.imageURL,
          comments: [],
        });

        // Get the user and add the post to the user
        const user = await User.findById(userId);
        user.posts.push(newPost);
        user.save();

        return newPost;
      } catch (err) {
        console.error(err);
        throw new Error('Failed to create a new post');
      }
    },
  },
};

module.exports = resolvers;
