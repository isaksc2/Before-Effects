import React, { useEffect } from "react";
import { withStyles } from "@material-ui/core/styles";
import { getDoc, doc } from "firebase/firestore/lite";
import { db } from "../Firebase.js";
import { useNavigate } from "react-router-dom";

function IntermediatePlayer(props) {
  const navigate = useNavigate();

  // get post from database
  const loadPostFromDatabase = async () => {
    try {
      const __doc = await getDoc(doc(db, "videos", props.uid));
      if (__doc.exists()) {
        // parse document
        const _doc = __doc.data();
        const posts = _doc.posts.split("¤");
        for (let i = 0; i < posts.length; i++) {
          const post = posts[i].split(";");
          if (post[3] === props.postID + "") {
            const vID1 = post[0];
            const username = _doc.username;
            const vID2 = post[1];
            const title = post[2];
            // navigate to new page when loaded
            navigate(
              "/user/" + props.uid + "/" + props.postID + "/" + username + "/" + title + "/" + vID1 + "/" + vID2,
              { replace: true }
            );
            return;
          }
          console.log("this post does not exist");
        }
      } else {
        console.log("This user has no posts");
      }
    } catch (e) {
      console.log("failed to read existing videos");
      console.log(e);
    }
  };

  useEffect(loadPostFromDatabase, []);

  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
}

export default IntermediatePlayer;
