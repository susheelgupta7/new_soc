const mongoose = require('mongoose');

const Post = mongoose.model('post');
const Follow = mongoose.model('follow');
const User = mongoose.model('users');
const { v4: uuidv4 } = require('uuid');

const requireLogin = require('../middlewares/requireLogin');

module.exports = (app) => {
    app.get('/api/get_feed', requireLogin, async (req,res) =>{
        try {
            const user = req.user.googleId;
            let feedArr = []; //main objective
            //logic
            let followedResponse = await Follow.find({user:user}); //mongoose query
            let followedUserArr = [];
            for(const fol of followedResponse){
                followedUserArr.push(fol.followed);
            }
            for (let users of followedUserArr) {
                let userPostArray = await Post.find({user:users});//mongoose query
                feedArr = [...feedArr, ...userPostArray];
            }
            res.send(feedArr);
        }catch(err){
            console.log(err);
            res.send(null);
        }


        //query to get post from only followed users
    });
    app.get('/api/get_all_users', async (req,res)=>{
        try{
            const allUsers = await User.find();
            const response = [];
            for(const data of allUsers){
                response.push({
                    name: data.name,
                    googleId: data.googleId
                })
            }
            res.send(response);
        } catch(err){
            console.log(err);
            res.send(null);
        }
    });
    app.get('/api/get_followed_users', async (req, res) =>{
        //get followed users from Follow table
        try{
            const user = req.user.googleId;
            const followedUsers = await Follow.find({user:user});
            const responseArr = [];
            for(const u of followedUsers){
                responseArr.push({
                    name:u.followedName,
                    googleId:u.followed
                })
            }
            res.send(responseArr);
        } catch(err){
            console.log(err);
            res.send(null);
        }
    });
    app.post('/api/follow', requireLogin, async (req,res)=>{
        //query to insert into followed array
        try{
            const user = req.user.googleId;
            const followed = req.body.followed;
            const followedName = req.body.followedName;
            const newFollow = await Follow({
                user:user,
                followed:followed,
                followedName:followedName
            }).save();
            res.send(true);
        } catch(err){
            console.log(err);
            res.send(null);
        }
    });
    app.post('/api/unfollow', requireLogin, async (req,res)=>{
        //query to remove from followed array
        try{
            const user = req.user.googleId;
            const followed = req.body.followed;
            const response = await Follow.deleteOne({user:user,followed:followed});
            res.send(true);
        } catch(err){
            console.log(err);
            res.send(null);
        }
    });
    app.post('/api/add_status', requireLogin, async (req,res)=>{
        const newId = uuidv4();
        const post = req.body.post;
        try {
            const newPost = await new Post({
                postId: newId,
                user: req.user.googleId,
                post: post,
                userName: req.user.name,
            }).save();
            res.send(true);
            console.log(newPost);
        } catch(err) {
            res.send(null);
        }
    });

}