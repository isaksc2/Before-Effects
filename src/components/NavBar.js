import React, { Component } from "react";
import { AppBar, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import SubmitVideo from "./SubmitVideo";
import SignInOut from "./SignInOut";
import logo from "../images/logo.png";

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
    const VideosPutton = () => {
      if (this.state.user) {
        return (
          <Button variant="contained">
            <Link to={"/user/" + this.state.user} style={{ marginRight: 16, textDecoration: "none" }} underline="none">
              Your videos
            </Link>
          </Button>
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
            }}
          >
            <SubmitVideo
              onUserChange={this.handleUserChange}
              signIn={() => this.signInOut.googleSignIn()}
              ref={(instance) => {
                this.submitVideo = instance;
              }}
            />

            <VideosPutton></VideosPutton>
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
