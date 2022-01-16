import React from "react";
import { Button, Slider } from "@material-ui/core";
import { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { getDoc, doc } from "firebase/firestore/lite";
import { db } from "../Firebase.js";
import { Link } from "react-router-dom";
import { UNSTARTED, ENDED, PLAYING, PAUSED, BUFFERING, CUED } from "../Constants.js";
import YouTube from "react-youtube";
import { wait } from "@testing-library/react";
//const [youtubeID] = useState('fAoRpLbJSVU')

// style of overlaying 2 videos
const styles = (theme) => ({
  parentDiv: {
    display: "grid",
    gridTemplateColumns: "1fr",
    padding: "0px", // 50
    backgroundColor: "rgba(0,0,0,0.5)",
    gridRowStart: 1,
    gridColumnStart: 1,
  },
  childDiv: {
    gridColumn: 1,
    gridRow: 1,
  },
});

// fixes react-youtube error (?)
window.YTConfig = {
  host: "https://www.youtube.com",
};

class PlayerContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  componentDidMount() {
    this.loadPostFromDatabase();
    this.setState({ loaded: true });
  }

  // get post from database
  loadPostFromDatabase = async () => {
    try {
      const __doc = await getDoc(doc(db, "videos", this.props.uid));
      if (__doc.exists()) {
        // parse document
        var _doc = __doc.data();
        const posts = _doc.posts.split("¤");
        for (let i = 0; i < posts.length; i++) {
          var post = posts[i].split(";");
          if (post[3] === this.props.postID + "") {
            this.vID1 = post[0];
            this.username = _doc.username;
            this.vID2 = post[1];
            this.title = post[2];
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

  // render
  render() {
    const { classes } = this.props;
    if (this.state.loaded) {
      const history = useHistory();
      history.push(
        "/user/" +
          this.props.uid +
          "/" +
          this.props.postID +
          "/" +
          this.username +
          "/" +
          this.title +
          "/" +
          this.vID1 +
          "/" +
          this.vID2
      );
    }
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  }
}

export default withStyles(styles)(PlayerContainer);
