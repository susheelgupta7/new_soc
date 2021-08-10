import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Tooltip } from '@material-ui/core';
import Box from '@material-ui/core/Box'
import { StylesProvider } from "@material-ui/core/styles";
import './Jobcard.css'
import moment from 'moment';
import {Snackbar} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";



class Jobcard extends Component {
    constructor(props) {
        super(props);
        var hc = 0, h = false;
        this.person = this.props.auth.googleId;
       
        this.state = {
            showDelete: false,
            showCard: true,
            redirect: false,
            failureSnackOpen: false
        };
    }
    
//closing failuresnack..
    handleClose= async()=>{
        await this.setState({
            failureSnackOpen: false
        });
    }
    render() {
        const job = this.props.job;//this was previously accessed through state and constructor was not getting called again when the component's key attribute was not specified
        const auth = this.props.auth;
        var datePosted = moment(job.postedOn).format("DD-MM-YYYY HH:mm");
        const date = new Date(job.jobExpiry);
        const default_date = new Date('1970,01,01');
        default_date.setHours(0, 0, 0, 0)
        const jobExpiry_date = new Date(job.jobExpiry);
        jobExpiry_date.setHours(0, 0, 0, 0);
        if (this.state.redirect) {
            return <Redirect push
                to={{
                    pathname: "/editjob",
                    state: { editJob: job }
                }} />;
        }
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
                            <div className="jobcard">
                                <div style={{ marginTop: "0.5rem", paddingLeft: "1rem", paddingRight: "1rem" }} >
                                    <div style={{ lineHeight: "100%" }}>
                                        <div style={{ lineHeight: "160%" }} className="jobcard-up">
                                            <p style={{ fontFamily: "Times New Roman", fontSize: "2rem", color: "rgb(90, 90, 90)" }} className="jobcard-up-line"><b>{job.companyName}</b></p>
                                        </div>
                                        
                                        <p style={{ fontSize: "0.8rem", color: "grey" }}>{datePosted}</p>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </StylesProvider>
                    <div>
            <Snackbar open={this.state.failureSnackOpen} autoHideDuration={6000} onClose={this.handleClose} >
          <Alert onClose={this.handleClose} severity="error">
            Error: Unable to delete Status Card
          </Alert>
        </Snackbar>
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
export default connect(mapStateToProps)(Jobcard);