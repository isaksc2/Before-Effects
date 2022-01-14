import React from "react";
import { Button, Slider } from "@material-ui/core";
import { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { getDoc, doc } from "firebase/firestore/lite";
import { db } from "../Firebase.js";
import { Link } from "react-router-dom";

import YouTube from "react-youtube";
import { CollectionsBookmarkOutlined } from "@material-ui/icons";
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
      player: [],
      videoDivide: 50,
      paused: true,
    };
    this.onReady = this.onReady.bind(this);
    this.clickPause = this.clickPause.bind(this);
    if (this.props.vID2) {
      this.vID1 = props.vID1;
      this.vID2 = props.vID2;
      this.title = props.title;
      this.username = props.username;
      // prettify url
      window.history.replaceState(null, "Video post", "/user/" + this.props.uid + "/" + this.props.postID);
    }
  }

  componentDidMount() {
    if (!this.props.vID2) {
      this.loadPostFromDatabase();
    }
  }

  // add youtube player to list of players
  onReady(event) {
    const player = this.state.player;
    player.push(event.target);
    this.setState({
      player: player,
    });
  }

  // pause videos
  clickPause() {
    const paused = this.state.paused;
    this.state.player.forEach((player) => {
      if (paused) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    });

    this.setState({ paused: !paused });
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
    return (
      <div>
        <h1>{this.title}</h1>
        <Link to={"/user/" + this.props.uid}>{"By: " + this.username}</Link>
        <div className={classes.parentDiv}>
          <div className={classes.childDiv}>
            <YouTube videoId={this.vID1} onReady={this.onReady} />
          </div>
          <div
            className={classes.childDiv}
            style={{
              clipPath:
                "polygon(" + this.state.videoDivide + "% 0%, " + this.state.videoDivide + "% 100%, 100% 100%, 100% 0%)",
            }}
          >
            <YouTube videoId={this.vID2} onReady={this.onReady} />
          </div>
        </div>
        <div>
          <Button variant="contained" style={{ marginRight: 16 }} onClick={this.clickSFX}>
            Toggle SFX
          </Button>
          <Button variant="contained" style={{ marginRight: 16 }} onClick={this.clickPause}>
            {this.state.paused ? "play" : "pause"}
          </Button>
        </div>
        <div style={{ marginLeft: "0%", marginRight: "0%" }}>
          <Slider
            value={this.state.videoDivide}
            step={0.1}
            onChange={(e, val) => this.setState({ videoDivide: val })}
          ></Slider>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PlayerContainer);
