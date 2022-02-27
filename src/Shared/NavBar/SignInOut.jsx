import React, { Component } from "react";
import { Button } from "@mui/material";
import { authentication } from "../../Firebase.js";
import { signOut, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "firebase/auth";

export default class SignInOut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
    };
  }

  componentDidMount() {
    // automatically update user in navbar
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        // signed in
        this.props.onUserChange(authentication.currentUser.uid);
        this.setState({ loggedIn: true });
      } else {
        // signed out
        this.props.onUserChange("");
        this.setState({ loggedIn: false });
      }
    });
  }

  async logOut() {
    signOut(authentication)
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => {
        console.log("failed to signout");
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
      });
  };

  render() {
    return (
      <div>
        <Button variant="contained" onClick={this.state.loggedIn ? this.logOut : this.googleSignIn}>
          {this.state.loggedIn ? "Log out" : "Log in"}
        </Button>
      </div>
    );
  }
}

export const googleSignIn = () => {
  var a = new SignInOut();
  a.googleSignIn();
};
