import { Button, Grid } from "@material-ui/core";
import React, { useState, useEffect, useCallback } from "react";
import Thumbnail from "Routes/User/Thumbnail.jsx";
import { getDoc, doc, setDoc, updateDoc, serverTimestamp } from "firebase/firestore/lite";
import { authentication, db } from "Firebase";
import { MAX_USERNAME_LENGTH } from "Constants/Constants";
import { TextField } from "@material-ui/core";
import { validateDocument } from "Validation/DatabaseProtection.js";

export default function UserList(props) {
  const [tempUsername, settempUsername] = useState("");
  const [editingUsername, seteditingUsername] = useState(false);
  const [document, setDocument] = useState(null);
  const [currentUid, setCurrentUid] = useState(null);

  // update view when current user loaded
  var unsubscribe = authentication.onAuthStateChanged(() => {
    if (authentication.currentUser != null) {
      setCurrentUid(authentication.currentUser.uid);
    } else {
      console.log("set to null");
      setCurrentUid(null);
    }
    // todo runs many times
  });

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const _doc = await getDoc(doc(db, "videos", props.uid));
        var username = "Guest";
        if (_doc.exists()) {
          setDocument(_doc.data());
          username = _doc.data().username;
        }
        settempUsername(username);
      } catch (e) {
        console.log("failed to read existing videos");
      }
    };
    loadPosts();
    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const checkInput = useCallback((target) => {
    // not too long username
    if (target.value.length > MAX_USERNAME_LENGTH) {
      target.value = target.value.substring(0, MAX_USERNAME_LENGTH);
    }
    settempUsername(target.value);
  }, []);

  const editUsernameIcon = useCallback((editingUsername) => {
    return editingUsername ? "Save" : "Edit";
    // eslint-disable-next-line
  }, []);

  const editUsername = useCallback(
    async (editingUsername, tempUsername, uid) => {
      console.log("edit");

      // if click "save" --> save username
      if (editingUsername) {
        var newName = tempUsername;
        var newDocument = document;
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
              await updateDoc(doc(db, "videos", uid), {
                latestWrite: serverTimestamp(),
                username: newName,
              });
              newDocument.username = newName;
            } else {
              // new document
              await setDoc(doc(db, "videos", uid), {
                created: serverTimestamp(),
                latestWrite: serverTimestamp(),
                posts: "",
                username: newName,
              });
              newDocument = {};
              newDocument.username = newName;
            }
            setDocument(newDocument);
          } catch (e) {
            console.log(e);
            console.log("failed to update document"); // todo unknown error
          }
        }
      }
      // swap button style
      seteditingUsername(!editingUsername);
    },
    [document] // todo probably add other arguments too, they dont call the function when update, just redefine the body
  );
  console.log(!(currentUid === props.uid));
  return (
    <div style={{ marginTop: 80 }}>
      <TextField
        disabled={!editingUsername}
        onChange={(e) => checkInput(e.target)}
        defaultValue={tempUsername}
        value={document && !editingUsername ? document.username : tempUsername}
        label="Username"
      ></TextField>
      {currentUid === props.uid && (
        <Button
          onClick={() => {
            editUsername(editingUsername, tempUsername, props.uid);
          }}
        >
          {editUsernameIcon(editingUsername)}
        </Button>
      )}
      <Grid container spacing={2}>
        {document && document.posts ? (
          document.posts
            .split("¤")
            .map((post) => post.split(";"))
            .map((post) => (
              <Grid item>
                <Thumbnail
                  uid={props.uid}
                  username={document.username}
                  vID1={post[0]}
                  vID2={post[1]}
                  title={post[2]}
                  postID={post[3]}
                ></Thumbnail>
              </Grid>
            ))
        ) : (
          <h1>
            {props.uid === currentUid ? "You have not posted any videos yet" : "This user has not posted any video yet"}
          </h1>
        )}
      </Grid>
    </div>
  );
}
