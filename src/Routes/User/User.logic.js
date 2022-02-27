import { useState, useEffect, useCallback } from "react";
import { authentication } from "Firebase";
import { getDoc, doc, updateDoc, serverTimestamp, setDoc } from "firebase/firestore/lite";
import { db } from "Firebase";
import { MAX_USERNAME_LENGTH } from "Constants/Constants";
import { validateDocument } from "Validation/DatabaseProtection";
import { limitTextLength } from "Validation/DatabaseProtection";
import { postsExist, parsePosts } from "Helper/Database";

export default function UserLogic(props) {
  const [tempUsername, settempUsername] = useState("");
  const [editingUsername, seteditingUsername] = useState(false);
  const [document, setDocument] = useState(null);
  const [currentUid, setCurrentUid] = useState(null);
  const [error, setError] = useState(false);

  // update view when current user loaded
  var unsubscribe = authentication.onAuthStateChanged(() => {
    if (authentication.currentUser != null) {
      setCurrentUid(authentication.currentUser.uid);
    } else {
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

  const editUsernameIcon = useCallback(
    (saveIcon, editIcon) => {
      return editingUsername ? saveIcon : editIcon;
    },
    [editingUsername]
  );

  const editUsername = useCallback(
    async () => {
      // if click "save" --> save username
      if (editingUsername) {
        const nameTooShort = tempUsername.length < 1;
        setError(nameTooShort);
        if (nameTooShort) return;

        var newDocument = document;
        // only save if name changed
        if (!document || (document && !(tempUsername === document.username))) {
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
              await updateDoc(doc(db, "videos", currentUid), {
                latestWrite: serverTimestamp(),
                username: tempUsername,
              });
              newDocument.username = tempUsername;
            } else {
              // new document
              await setDoc(doc(db, "videos", currentUid), {
                created: serverTimestamp(),
                latestWrite: serverTimestamp(),
                posts: "",
                username: tempUsername,
              });
              newDocument = {};
              newDocument.username = tempUsername;
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
    [document, editingUsername, currentUid, tempUsername] // todo probably add other arguments too, they dont call the function when update, just redefine the body
  );

  function onChange(e) {
    const newName = limitTextLength(e.target.value, MAX_USERNAME_LENGTH);
    settempUsername(newName);
    e.target.value = newName;
  }

  function isMyPage() {
    return currentUid === props.uid;
  }

  function getPosts() {
    return postsExist(document) ? parsePosts(document) : [];
  }

  return {
    tempUsername,
    editingUsername,
    document,
    currentUid,
    editUsername,
    editUsernameIcon,
    onChange,
    error,
    isMyPage,
    getPosts,
  };
}
