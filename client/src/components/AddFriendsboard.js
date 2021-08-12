import React, { Component } from 'react';
import axios from 'axios';
class AddFriend extends Component {
    constructor(props) {
        super();
        this.state ={
            users:[]
        }
    }

    async componentDidMount() {
        const userArr = await axios.get(`${process.env.PUBLIC_URL}/api/get_all_user`); //api check
        this.setState({
            users: userArr.data
        })
    }
    render() {
        const userList = this.state.user;
        return(
            <div className="Adduser">
                {
                    userList.map(user=>(
                        <div className="user">
                            <p>{user.user}</p>
                        </div>
                    ))
                }
            </div>
        )
    }
}
export default AddFriend;
