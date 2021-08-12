const mongoose = require('mongoose');
const { stringify } = require('uuid');
const { Schema } = mongoose;


const followSchema = new Schema({
    followId:String,
    follower: [{followed: String}]
});

mongoose.model('follow', followSchema);