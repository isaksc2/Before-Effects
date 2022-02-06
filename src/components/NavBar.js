import React, { Component } from "react";
import { Toolbar, Image } from "@material-ui/core";
import { Link } from "react-router-dom";
import SubmitVideo from "./SubmitVideo";
import SignInOut from "./SignInOut";
import logo from "../images/logo.png";

export default class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sticky: true,
      user: "",
    };
    this.handleUserChange = this.handleUserChange.bind(this);
  }

  handleUserChange(uid) {
    this.setState({ user: uid });
  }

  render() {
    return (
      <Toolbar position="sticky" style={{ backgroundColor: "#ff0000" }}>
        <div
          style={{
            display: "flex",
            backgroundColor: "#0000ff",
            position: "absolute",
            right: 0,
            left: 0,
            marginRight: 10,
          }}
        >
          <Link to="/" style={{ marginRight: 16 }}>
            <img src={logo} style={{ height: 50 }}></img>
          </Link>
          <div
            style={{
              display: "flex",
              backgroundColor: "#00ff00",
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
            <Link to={"/user/" + this.state.user} style={{ marginRight: 16 }}>
              My videos
            </Link>
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
      </Toolbar>
    );
  }
}
