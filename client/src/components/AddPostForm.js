import axios from 'axios';
import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import './AddPostForm.css'


class AddPostForm extends Component {
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
        const Post = {
            post: this.state.post,
            

        }
        try {
            await axios.post(`${process.env.PUBLIC_URL}/api/add_Post`, Post);
            this.setState({ redirect: true });
        }
        catch (error) {
            this.setState({
                failureSnack: true
            });
        }
    }
    handleCloseFailureSnack = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({
            failureSnack: false
        });
    };
    render() {
        //button logic
        var x = this.state.post;
        let sumbitButton = x ? <input style={{ color: "#33b579", width: "6rem", height: "3rem", fontWeight: "900" }}
            type='submit' /> : <p style={{ color: "red" }}>Submit button will appear if you add something to this form</p>;


        const { redirect } = this.state;
        if (redirect) {
            return <Redirect push to="/Postboard" />;
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
                                <Snackbar open={this.state.failureSnack} autoHideDuration={6000} onClose={this.handleCloseFailureSnack} >
                                    <Alert onClose={this.handleCloseFailureSnack} severity="error" elevation={6} variant="filled">
                                        Failed to add your Status.
                                    </Alert>
                                </Snackbar>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddPostForm;