import React, { Component } from "react";
import PlayerContainer from "../components/PlayerContainer";
import logo from "../images/logo.png";

export default class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <img src={logo} style={{ height: 90, marginTop: 40, marginBottom: -32, marginRight: -30 }}></img>{" "}
          <h1 style={{ display: "inline" }}>foreFX</h1>
        </div>

        <h1>Welcome, upload two videos to get started!</h1>
        <PlayerContainer vID1="SgbF2WRkwgM" vID2="fAoRpLbJSVU" />
      </div>
    );
  }
}
