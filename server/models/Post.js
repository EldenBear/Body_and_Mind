const { Schema } = require('mongoose');
const commentSchema = require('./commentSchema');

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
      },
    image: {
      type: String,
    },
    comments: [commentSchema],
});

const Post = model('Post', postSchema);

module.exports = Post;