import React, { Component } from 'react'
import { Toolbar} from '@material-ui/core'
import { Link } from "react-router-dom"
import SubmitVideo from './SubmitVideo'
import SignInOut from './SignInOut'

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sticky: true,
            user: ""
        };
        this.handleUserChange = this.handleUserChange.bind(this);
    }

    handleUserChange(uid) {
        this.setState({ user: uid })
    }

    render() {

        return (
            <Toolbar position="sticky">
                <Link to="/" style={{ marginRight: 16 }}>Start page</Link>
                <Link to={"/user/" + this.state.user} style={{ marginRight: 16 }}>My videos</Link>
                <SubmitVideo onUserChange={this.handleUserChange} signIn={() => this.signInOut.googleSignIn()} ref={instance => {this.submitVideo = instance}}/>
                <SignInOut onUserChange={(uid) => {this.handleUserChange(uid); this.submitVideo.userChanged()}} ref={instance => {this.signInOut = instance}}></SignInOut>
            </Toolbar>
        )
    }
}