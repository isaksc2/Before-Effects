import React, { Component } from "react";
import { AppBar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import SubmitVideo from "../Upload/SubmitVideo";
import SignInOut from "./SignInOut";

import logo from "Assets/Images/logo.png";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sticky: true,
      user: null,
    };
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  handleUserChange(uid) {
    this.setState({ user: uid });
  }

  render() {
    const VideosButton = () => {
      if (this.state.user) {
        return (
          <Link to={"/user/" + this.state.user} style={{ textDecoration: "none" }} underline="none">
            <Button variant="contained">Your videos</Button>
          </Link>
        );
      }
      return null;
    };
    return (
      <AppBar style={{ position: "sticky" }}>
        <div
          style={{
            display: "flex",
            position: "absolute",
            right: 0,
            left: 0,
            marginRight: 10,
          }}
        >
          <Link to="/" style={{ marginRight: 16 }}>
            <img src={logo} alt={""} style={{ height: 50 }}></img>
          </Link>
          <div
            style={{
              display: "flex",
              position: "absolute",
              right: 0,
              top: 10,
              gap: 10,
            }}
          >
            <SubmitVideo
              onUserChange={this.handleUserChange}
              signIn={() => this.signInOut.googleSignIn()}
              ref={(instance) => {
                this.submitVideo = instance;
              }}
            />

            <VideosButton></VideosButton>
            <SignInOut
              onUserChange={(uid) => {
                this.handleUserChange(uid);
                this.submitVideo.userChanged();
              }}
              ref={(instance) => {
                this.signInOut = instance;
              }}
            ></SignInOut>
          </div>
        </div>
      </AppBar>
    );
  }
}
