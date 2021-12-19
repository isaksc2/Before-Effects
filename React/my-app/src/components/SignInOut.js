import React, { Component, Uploader, MediaUploader } from 'react';
import { Button } from '@material-ui/core'
import { authentication, db } from '../Firebase.js';
import { signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';



export default class SignInOut extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false
        };
        // automatically update user in navbar
        onAuthStateChanged(authentication, (user) => {
            if (user) {
                // signed in
                this.props.onUserChange(authentication.currentUser.uid);
                this.setState({ loggedIn: true })
            } else {
                // signed out
                this.props.onUserChange("");
                this.setState({ loggedIn: false })
            }
        });
    }

    googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
            .then((re) => {
                console.log(re);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    async logOut() {
        const email = "a.b@c.com";
        const password = "1234567";
        signOut(authentication)
            .then(() => {
                console.log("signed out");
            })
            .catch((error) => {
                console.log("failed to signout");
            });
    }

    render() {
        return (
            <div>
                <Button variant="contained" onClick={this.state.loggedIn ? this.logOut : this.googleSignIn}>{this.state.loggedIn ? "Log out" : "Log in"}</Button>
            </div>
        )
    }
}

export const googleSignIn = SignInOut.googleSignIn;
