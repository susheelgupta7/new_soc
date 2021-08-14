import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from '../media/logo2.0.png';
import './Header.css'

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            navClass: "nav-links",
            currPage: ""
        }
    }
    getNavElement = () => {
        const auth = this.props.auth;
        if (auth === null)
            return;
        if (auth === false)
            return (
                <li><a href={`${process.env.PUBLIC_URL}/auth/google`}>Login With Google</a></li>
            )
        return (
            <>
                <div className="links">
                    <li style={{  display: "block", height: "2.5rem" }}><a href={`${process.env.PUBLIC_URL}/newsfeed`}><span style={{ color: "white" }}>Feeds</span></a></li>
                    <li style={{  display: "block", height: "2.5rem" }}><a href={`${process.env.PUBLIC_URL}/addnewfeed`}><span style={{ color: "white" }}>Add Feeds</span></a></li>
                    <li style={{  display: "block", height: "2.5rem" }}><a href={`${process.env.PUBLIC_URL}/addfriend`}><span style={{ color: "white" }}>Add Friends</span></a></li>
                    <li ><a href={`${process.env.PUBLIC_URL}/api/logout`}>Logout</a></li>
                </div>
            </>
        )

    }
    render() {
        return (
            <div className="head">
                <div style={{ display: "inline" }} >
                    <Link
                        to='/'
                    >
                        <img src={logo} alt="Friends Circle" className="logo-image" />
                    </Link>
                </div>
                <div className="nav-words">
                    <ul style={{ display: "inline" }} className={this.state.navClass}>
                        {this.getNavElement()}
                    </ul>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ auth }) {
    return { auth };
}

export default connect(mapStateToProps)(Header);