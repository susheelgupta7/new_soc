import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Landing.css'

class Landing extends Component {
    render() {
        
        return (
            <div style={{ height: "88.5vh" }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: "30px", marginTop: "50px", color: "#808080", fontWeight: "bold" }} >Welcome to Friends Circle!!</div>
                </div>
            </div>
        );
    }
};

function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(Landing);
