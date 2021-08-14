import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import './AddFeedForm.css'


class AddFeedForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: '',
        };
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }
    
    submitHandler = async (event) => {
        event.preventDefault();
        const post = {
            post: this.state.post,
        }
        try {
            await axios.post(`${process.env.PUBLIC_URL}/api/add_status`, post);
            this.setState({ redirect: true });
        }
        catch (error) {
            console.log(error);
        }
    }
  
    render() {
        //button logic
        var x = this.state.post;
        let sumbitButton = x ? <input style={{ color: "#33b579", width: "6rem", height: "3rem", fontWeight: "900" }}
            type='submit' /> : <p style={{ color: "red" }}>Submit button will appear if you add something to this form</p>;


        const { redirect } = this.state;
        if (redirect) {
            return <Redirect push to="/newsfeed" />;
        }


        return (
            <div className="addform">
                <div className="container">
                    <div className="addfo">
                        <div style={{ color: "grey", marginTop: '2rem' }}>
                            <span style={{ color: "grey", fontSize: "2rem", fontWeight: "500" }}>Add a Status</span>
                        </div>
                        <div style={{ overflow: "scroll" }} className="form">
                            <form onSubmit={this.submitHandler}>
                                <p style={{ color: "black" }}><b>Add Status* :</b></p>
                                <input
                                    type='text'
                                    name='post'
                                    onChange={this.myChangeHandler}
                                />
                                <div>
                                    {sumbitButton}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddFeedForm;