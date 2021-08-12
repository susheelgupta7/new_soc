const mongoose = require('mongoose');
const Post = mongoose.model('post');
const Follow = mongoose.model('follow');
const User = mongoose.model('users');
const { v4: uuidv4 } = require('uuid');
const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.get('/api/get_feed', requireLogin, async (req,res) =>{
        try {
            const user = req.user;
            let feedArr = []; //main objective
            //logic
            let followedResponse = await Follow.find({follower:user}); //mongoose query
            let followedUserArr = followedResponse.followed;

            for (let users of followedUserArr) {
                let userPostArray = await Post.find({user:user});//mongoose query
                feedArr = [...feedArr, ...userPostArray];
            }
            res.send(feedArr);
        }catch(err){
            console.log(err);
            res.send(null);
        }


        //query to get post from only followed users
    });
    app.get('/api/get_all_users', requireLogin, async (req,res)=>{
        try{
            const allUsers = await User.find();
            res.send(allUsers);
        } catch(err){
            console.log(err);
            res.send(null);
        }
        //query to get all users from the user table
    });
    app.get('/api/follow', requireLogin, async (req,res)=>{
        //query to insert into followed array
        try {
            Follow.findByIdAndUpdate(req.body.followId,
                { $push: { followed: req.body.followed } }
            );
            return res.send({ message: "User Follow Success"});
        } catch (err) {
            return res.send("error occured in following");
        }
    });
    app.get('/api/unfollow', requireLogin, async (req,res)=>{
        //query to remove from followed array
        try {
            Follow.findByIdAndUpdate(req.body.followId,
                { $pull: { followed: req.body.followed } }
            );
            return res.send({ message: "User UnFollow Success"});
        } catch (err) {
            return res.send("error occured in unfollowing");
        }
    
    });
    app.post('/api/add_status', requireLogin, async (req,res)=>{
        const newId = uuidv4();
        const post = req.body.post;
        const user = req.user;
        try {
            const newPost = new Post({
                postId: newId,
                user: user,
                post: post,
            }).save();
            res.send(true);
        } catch(err) {
            res.send(err);
        }
    });

}