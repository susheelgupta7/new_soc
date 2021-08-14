const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    postId: String,
    user: String,
    post: String,
    userName: String,
});

mongoose.model('post', postSchema);
