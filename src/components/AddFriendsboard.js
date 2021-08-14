import React, { Component } from 'react';
import axios from 'axios';



class AddFriend extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allUsers:[],
            followedUsers:[]
        }
    }
    async componentDidMount() {
        await this.fetchUsers();
    }
    async fetchUsers(){
        const allU = await axios.get(`${process.env.PUBLIC_URL}/api/get_all_users`);
        const allUsers = allU.data;
        const followed = await axios.get(`${process.env.PUBLIC_URL}/api/get_followed_users`)
        const followedUsers = followed.data;
        const googleIdOfFolloweUsers = [];
        for(const fol of followedUsers){
            googleIdOfFolloweUsers.push(fol.googleId);
        }
        for(const user of allUsers){
            if(googleIdOfFolloweUsers.includes(user.googleId)){
                user.isFollowed = true;
            } else{
                user.isFollowed = false;
            }
        }
        this.setState({
            allUsers:allUsers,
            followedUsers:followedUsers
        });
    }
    async followUser(userGoogleId,name){
        const body = {
            followed:userGoogleId,
            followedName:name
        }
        console.log(body);
        try{
            await axios.post(`${process.env.PUBLIC_URL}/api/follow`, body);
        } catch(err){
            console.log(err);
        }
        this.fetchUsers();
    }
    async unFollowUser(userGoogleId){
        const body = {
            followed:userGoogleId
        }
        console.log(body);
        try{
            await axios.post(`${process.env.PUBLIC_URL}/api/unfollow`, body);
        } catch(err){
            console.log(err);
        }
        this.fetchUsers();
    }
    
    render() {
        const allUsers = this.state.allUsers;
        return (
            <div>
                {
                    allUsers?
                    allUsers.map((user,index)=>(
                        <div>
                            {
                                user.isFollowed?
                                    <div>
                                        <h3 style={{color: "black"}}>{user.name}</h3>
                                        <h4 style={{color: "red"}} onClick={() => this.unFollowUser(user.googleId)}>Unfollow</h4>
                                        <br/>
                                    </div> :
                                    <div>
                                        <h3 style={{color: "black"}}>{user.name}</h3>
                                        <h4 style={{color: "green"}} onClick={() => this.followUser(user.googleId,user.name)}>Follow</h4>
                                        <br/>
                                    </div>
                            }
                        </div>
                    )):
                        null
                }
            </div>
        )
    }
}
export default AddFriend;


