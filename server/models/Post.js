const { Schema } = require('mongoose');

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

});

const Post = model('Post', postSchema);

module.exports = Post;