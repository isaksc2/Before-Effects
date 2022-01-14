import { Button } from "@material-ui/core";
import React, { Component } from "react";
import Thumbnail from "../components/Thumbnail";
import { getDoc, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore/lite";
import { authentication, db } from "../Firebase";
import { MAX_USERNAME_LENGTH } from "../Constants";
import { TextField } from "@material-ui/core";
import { validateDocument } from "../Util";

export default class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tempUsername: "",
      editingUsername: false,
      document: null,
    };
  }

  async componentDidMount() {
    try {
      const _doc = await getDoc(doc(db, "videos", this.props.uid));
      var username = "Guest";
      if (_doc.exists()) {
        this.setState({ document: _doc.data() });
        username = _doc.data().username;
      }
      this.setState({ tempUsername: username });
    } catch (e) {
      console.log("failed to read existing videos");
    }
  }

  // check if username valid
  checkInput = (target) => {
    // not too long username
    if (target.value.length > MAX_USERNAME_LENGTH) {
      target.value = target.value.substring(0, MAX_USERNAME_LENGTH);
    }
    this.setState({ tempUsername: target.value });
  };

  editUsernameIcon = (editingUsername) => {
    return editingUsername ? "Save" : "Edit";
  };

  editUsername = async () => {
    var currentState = this.state.editingUsername;
    // if click "save" --> save username
    if (currentState) {
      var newName = this.state.tempUsername;
      var document = this.state.document;
      // only save if name changed
      if (!document || (document && !(newName === document.username))) {
        // update or create new document
        try {
          if (document) {
            // update document
            const failed = validateDocument(document);
            if (failed) {
              // tried to update name too quick
              console.log(failed);
              return; // todo start thread?    probably not, no one would actually need to operate this fast
            }
            await updateDoc(doc(db, "videos", this.props.uid), {
              latestWrite: serverTimestamp(),
              username: newName,
            });
            document.username = newName;
          } else {
            // new document
            await setDoc(doc(db, "videos", this.props.uid), {
              created: serverTimestamp(),
              latestWrite: serverTimestamp(),
              posts: "",
              username: newName,
            });
            document = {};
            document.username = newName;
          }
          this.setState({ document: document });
        } catch (e) {
          console.log(e);
          console.log("failed to update document"); // todo unknown error
        }
      }
    }
    // swap button style
    this.setState({ editingUsername: !currentState });
  };

  render() {
    return (
      <div>
        <TextField
          disabled={!this.state.editingUsername}
          onChange={(e) => this.checkInput(e.target)}
          defaultValue={this.state.tempUsername}
          value={
            this.state.document && !this.state.editingUsername ? this.state.document.username : this.state.tempUsername
          }
          label="Username"
        ></TextField>
        <Button hidden={!(this.props.uid === authentication.currentUser.uid)} onClick={this.editUsername}>
          {this.editUsernameIcon(this.state.editingUsername)}
        </Button>
        <div>
          {this.state.document && this.state.document.posts ? (
            this.state.document.posts
              .split("¤")
              .map((post) => post.split(";"))
              .map((post) => (
                <Thumbnail
                  uid={this.props.uid}
                  username={this.state.document.username}
                  vID1={post[0]}
                  vID2={post[1]}
                  title={post[2]}
                  postID={post[3]}
                ></Thumbnail>
              ))
          ) : (
            <h1>
              {this.props.uid === authentication.currentUser.uid
                ? "You have not posted any videos yet"
                : "This user has not posted any video yet"}
            </h1>
          )}
        </div>
      </div>
    );
  }
}
