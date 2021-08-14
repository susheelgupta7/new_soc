const mongoose = require('mongoose');
const { stringify } = require('uuid');
const { Schema } = mongoose;


const followSchema = new Schema({
    user:String,
    followed: String,
    followedName:String
});

mongoose.model('follow', followSchema);