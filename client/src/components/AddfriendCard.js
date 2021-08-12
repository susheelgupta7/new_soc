import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box'
import { StylesProvider } from "@material-ui/core/styles";
import './AddfriendCard.css'

class AddfriendCard extends Component {
    constructor(props) {
        super(props);
        this.person = this.props.auth.googleId;
       
        this.state = {
            showDelete: false,
            showCard: true,
            redirect: false,
        };
    }
    render() {
        const feed = this.props.feed;//this was previously accessed through state and constructor was not getting called again when the component's key attribute was not specified
        const auth = this.props.auth;
        if (this.state.showCard) {
            return (
                <div>
                    <StylesProvider injectFirst>
                        <Box
                            boxShadow={1}
                            bgcolor="background.paper"
                            m={1}
                            p={1}
                        >
                            <div className="AddfriendCard">
                                <div style={{ marginTop: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem" }} >
                                    <div style={{ lineHeight: "100%" }}>
                                        <div style={{ lineHeight: "160%" }} className="AddfriendCard-up">
                                            <p style={{ fontFamily: "Times New Roman", fontSize: "2rem", color: "rgb(90, 90, 90)" }} className="AddfriendCard-up-line"><b>{User.user}</b></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </StylesProvider>
                    <div>
            </div>
                </div>

            )
        }
        else {
            return null;
        }
    }
};
function mapStateToProps({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(AddfriendCard);
