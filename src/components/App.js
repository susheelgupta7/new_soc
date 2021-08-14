
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import AddFeedForm from './AddFeedForm';
import NewsFeed from "./newsFeed";
import './App.css';
import AddFriend from "./AddFriendsboard";

class App extends Component {
    componentDidMount() {
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
                        <Route exact path="/newsfeed" component={NewsFeed} />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/addnewfeed" component={AddFeedForm} />
                        <Route exaxt path= "/addfriend" component={AddFriend}/>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
};
export default connect(null, actions)(App);