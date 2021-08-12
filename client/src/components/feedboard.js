import React, { Component } from 'react';
import axios from 'axios';
class NewsFeed extends Component {
    constructor(props) {
        super();
        this.state ={
            posts:[]
        }
    }

    async componentDidMount() {
        const feedArr = await axios.get(`${process.env.PUBLIC_URL}/api/get_feed`); //api check
        this.setState({
            posts: feedArr.data
        })
    }
    render() {
        const feedPost = this.state.posts;
        return(
            <div className="newsfeed">
                {
                    feedPost.map(post=>(
                        <div className="post">
                            <p>{post.post}</p>
                        </div>
                    ))
                }
            </div>
        )
    }
}
export default NewsFeed;