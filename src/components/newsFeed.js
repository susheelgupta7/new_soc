import React, { Component } from 'react';
import axios from 'axios';
class NewsFeed extends Component {
    constructor(props) {
        super(props);
        this.state ={
            posts:[]
        }
    }

    async componentDidMount() {
        const feedArr = await axios.get(`${process.env.PUBLIC_URL}/api/get_feed`); //api check
        console.log(feedArr);
        this.setState({
            posts: feedArr.data
        })
    }
    render() {
        const feedPost = this.state.posts;
        console.log(feedPost);
        return(
            <div className="newsfeed">
                {
                    feedPost?
                    feedPost.map(post=>(
                        <div className="post">
                            <h4 style={{color: "black"}}>{post.userName}</h4>
                            <h5 style={{color: "red"}}>{post.post}</h5>
                        </div>
                    )):
                        null
                }
            </div>
        )
    }
}
export default NewsFeed;