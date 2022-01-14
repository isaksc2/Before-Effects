import React, { Component } from "react";
import { Button, TextField } from "@material-ui/core";
import { collection, getDocs, getDoc, setDoc, doc, serverTimestamp, updateDoc } from "firebase/firestore/lite";
import { authentication, db } from "../Firebase.js";
import UploadPopup from "./UploadPopup.js";
import Modal from "react-modal";
import { validateDocument } from "../Util.js";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default class SubmitVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleSFX: true,
      modalIsOpen: false,

      vID1: "",
      vID1Temp: "",
      vID1Error: -1,
      vID1Hint: "",

      vID2: "",
      vID2Temp: "",
      vID2Error: -1,
      vID2Hint: "",

      title: "",
      titleTemp: "",
      titleError: -1,
      titleHint: "",
    };
    this.ongoingSubmission = false;
  }

  readDB = async () => {
    const videosCol = collection(db, "videos");
    const videosSnapshot = await getDocs(videosCol);
    const videoList = videosSnapshot.docs.map((doc) => doc.data());
    console.log(videoList);
  };

  // used to resume submission if you had to login halfway through
  userChanged = () => {
    if (this.ongoingSubmission) {
      this.sendDB();
    }
  };

  // create or update a user's document
  sendDB = async () => {
    var currentUser = authentication.currentUser;
    // if not logged in, log in and retry? need "delay" to wait for login?
    if (currentUser == null) {
      console.log("user not logged in");
      this.ongoingSubmission = true;
      this.props.signIn();
      currentUser = authentication.currentUser;
      return;
    }
    this.ongoingSubmission = false;
    try {
      const document = await getDoc(doc(db, "videos", currentUser.uid));
      if (document.exists()) {
        // update previous document
        const failed = validateDocument(document.data());
        if (failed) {
          return;
          // todo print "too fast"
        }
        var _doc = document.data();
        // increment id or start from 0
        var nextPostID = _doc.posts ? parseInt(_doc.posts.split(";").pop()) + 1 : 0;
        await updateDoc(doc(db, "videos", currentUser.uid), {
          latestWrite: serverTimestamp(),
          posts:
            _doc.posts +
            (_doc.posts ? "¤" : "") +
            this.state.vID1 +
            ";" +
            this.state.vID2 +
            ";" +
            this.state.title +
            ";" +
            nextPostID,
        });
      } else {
        // create new document
        await setDoc(doc(db, "videos", currentUser.uid), {
          created: serverTimestamp(),
          latestWrite: serverTimestamp(),
          posts: this.state.vID1 + ";" + this.state.vID2 + ";" + this.state.title + ";" + 0,
          username: "Guest",
        });
      }
    } catch (e) {
      console.log("failed to search existing document");
    }
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  // collect data from text fields
  checkInput = (input, error, hint, temp, saved, isUrl) => {
    console.log("check link 2");
    this.setState({ [temp]: input });
    const _input = isUrl ? this.getVideoID(input) : input;
    var _error = 1;
    var _hint = "";
    if (input.length === 0) {
      _error = -1;
    } else if (_input) {
      if (this.noReservedChars(_input)) {
        console.log("ok link 2");
        _error = 0;
        this.setState({ [saved]: _input });
      } else {
        console.log("character not allowed 2");
        _hint = "cannot contain ¤ ;";
      }
    } else {
      console.log("invalid link 2");
      _hint = "video link invalid, try copying again";
    }
    this.setState({ [error]: _error });
    this.setState({ [hint]: _hint });
  };

  noReservedChars = (input) => {
    let regex = /;+|¤+/;
    return !regex.test(input);
  };

  getVideoID = (url) => {
    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    var match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : false;
  };

  render() {
    return (
      <div>
        <Button variant="contained" onClick={this.openModal}>
          Upload video
        </Button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <Button onClick={this.closeModal} style={{ position: "absolute", top: "0px", right: "0px" }}>
            X
          </Button>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              error={this.state.vID1Error === 1}
              onChange={(e) => this.checkInput(e.target.value, "vID1Error", "vID1Hint", "vID1Temp", "vID1", true)}
              helperText={this.state.vID1Hint}
              defaultValue={this.state.vID1Temp}
              id={this.state.vID1Error === 1 ? "standard-error" : "standard"}
              label="Link for no VFX video"
            ></TextField>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              error={this.state.vID2Error === 1}
              onChange={(e) => this.checkInput(e.target.value, "vID2Error", "vID2Hint", "vID2Temp", "vID2", true)}
              helperText={this.state.vID2Hint}
              defaultValue={this.state.vID2Temp}
              id={this.state.vID2Error === 1 ? "standard-error" : "standard"}
              label="Link for VFX video"
            ></TextField>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              error={this.state.titleError === 1}
              onChange={(e) => this.checkInput(e.target.value, "titleError", "titleHint", "titleTemp", "title", false)}
              helperText={this.state.titleHint}
              defaultValue={this.state.titleTemp}
              id={this.state.vID2Error === 1 ? "standard-error" : "standard"}
              label="Title"
            ></TextField>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              onClick={this.sendDB}
              disabled={this.state.vID1Error || this.state.vID2Error || this.state.titleError}
            >
              Upload
            </Button>
          </div>
        </Modal>
        <UploadPopup trigger={false}></UploadPopup>
      </div>
    );
  }
}

/*
var uploader = new MediaUploader({
    baseUrl: "https://www.googleapis.com/upload/youtube/v3/videos",
    file: ".\videos\desktopTest.mp4",
    token: this.accessToken,
    metadata: metadata,
    params: {
        part: Object.keys(metadata).join(",")
    },
    onError: function (data) {
        // onError code
    }.bind(this),
    onProgress: function (data) {
        // onProgress code
    }.bind(this),
    onComplete: function (data) {
        // onComplete code
    }.bind(this)
});

var metadata = {
    snippet: {
        title: "test title",
        description: "test desc",
        tags: "videogame",
        categoryId: 22
    },
    status: {
        privacyStatus: "private",
        embeddable: true
    }
};

const responseGoogle = (response) => {
    console.log(response);
}

ReactDOM.render(
    <GoogleLogin
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
    />,
    document.getElementById('googleButton')
);
*/
