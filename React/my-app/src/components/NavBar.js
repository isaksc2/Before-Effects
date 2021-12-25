import React, { Component } from 'react'
import CustomButton from './CustomButton'
import logo from '../images/logo.svg'
import logoMobile from '../images/logoMobile.svg'
import { Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Link } from "react-router-dom"
import { authentication } from '../Firebase'
import SubmitVideo from './SubmitVideo'
import SignInOut, { googleSignIn } from './SignInOut'

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