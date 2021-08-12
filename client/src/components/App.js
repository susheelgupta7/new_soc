
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import AddPostForm from './AddPostForm';
import newsFeed from './newsFeed';
import './App.css';

class App extends Component {
    //Lifecycle hook
    //we are wiring up action creator with app as many components may need it.
    componentDidMount() {

        //Acessing the action creator through props
        this.props.fetchUser();
    }
    render() {
        return (
            <BrowserRouter basename={`${process.env.PUBLIC_URL}`}>
                <div className="app">
                    <div className="main-header">
                        <Header />
                    </div>
                    <div className="lower-content-all-page">
                        <Route exact path="/newsFeed" component={newsFeed} />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/addnewfeed" component={AddPostForm} />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
};
// first argument is about map state's of props function and the second argument is to wire up all the action creators with the app
// The actions are assigned to the app component as the props
export default connect(null, actions)(App);