import React, { Component } from "react";
import { TextField } from "@mui/material";

export default class UploadPopup extends Component {
  render() {
    return this.props.trigger ? (
      <div className="popup">
        <div className="popup-inner">
          <TextField> Link for no-VFX no-music video</TextField>
          <TextField> Link for VFX video</TextField>
          <TextField> Title</TextField>
        </div>
      </div>
    ) : (
      ""
    );
  }
}
