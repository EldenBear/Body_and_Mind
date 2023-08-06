const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  postId: {
    type: Number,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  postText: {
    type: String,
  },
  imageURL: {
    type: String,
  },
});

const Post = model('Post', postSchema);

module.exports = Post;
