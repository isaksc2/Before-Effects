import React from "react";
import { Button, Slider } from "@material-ui/core";
import { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { getDoc, doc } from "firebase/firestore/lite";
import { db } from "../Firebase.js";
import { Link } from "react-router-dom";
import { UNSTARTED, ENDED, PLAYING, PAUSED, BUFFERING, CUED } from "../Constants.js";
import YouTube from "react-youtube";
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
      videoDivide: 50,
      paused: true,
      ready: false,
      documentLoaded: false,
      ready1: false,
      ready2: false,
    };
    if (this.props.vID2) {
      this.vID1 = props.vID1;
      this.vID2 = props.vID2;
      this.title = props.title;
      this.username = props.username;
      //this.vID1 = props.vID1;
      //this.vID2 = props.vID2;
      //this.title = props.title;
      //this.username = props.username;
      // prettify url
      window.history.replaceState(null, "Video post", "/user/" + this.props.uid + "/" + this.props.postID);
      this.firstRender = true;
    }
  }

  componentDidMount() {
    if (!this.props.vID2) {
      this.loadPostFromDatabase();
    }
    this.setState({ documentLoaded: true });
  }

  // pause videos
  clickPause = () => {
    const paused = this.state.paused;
    if (paused) {
      this.player1.playVideo();
      this.player2.playVideo();
    } else {
      this.player1.pauseVideo();
      this.player2.pauseVideo();
    }
    this.setState({ paused: !paused });
  };

  clickSFX = () => {
    if (this.player1.isMuted()) {
      this.player1.unMute();
      this.player2.mute();
    } else {
      this.player2.unMute();
      this.player1.mute();
    }
  };

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

  // syncing logic

  onPlayer1Ready = (event) => {
    console.log("1 on ready ____________________");
    if (!this.player1) {
      this.player1 = event.target;
    }
    this.setState({ ready1: true });
  };

  onPlayer2Ready = (event) => {
    if (!this.player2) {
      this.player2 = event.target;
    }
    this.setState({ ready2: true });
  };

  onPlayer1StateChange = (event) => {
    console.log("1 " + event.data);
    if (event.data === PLAYING) {
      console.log("is 1 preloading " + this.preloading1);
      if (this.preloading1) {
        //alert("Background ready"); // For testing
        this.player1.pauseVideo(); // Pause the video
        this.player1.seekTo(0); // Rewind
        //this.player1.unMute(); // Comment this after test
        //$( "#player1" ).show();         // Show the player
        this.preloading1 = false;

        this.player2Ready = true;
        console.log("start prelaod 2");
        this.preloading2 = true; // Flag for foreground video preloading
        this.player2.mute();
        //$( "#player2" ).hide();
        this.player2.seekTo(1); // Start buffering and wait the event
      } else this.player2.playVideo(); // If not preloading link the 2 players PLAY events
    } else if (event.data === PAUSED) {
      if (!this.preloading1) {
        this.done1 = 0;
        this.player2.pauseVideo(); // If not preloading link the 2 players PAUSE events
      }
    } else if (event.data === BUFFERING) {
      if (!this.preloading1) {
        this.player2.pauseVideo(); // If not preloading link the 2 players BUFFERING events
      } else {
        this.done1 = 1;
      }
    } else if (event.data === CUED) {
      console.log("1 __" + this.preloading1);
      if (!this.preloading1) {
        this.player2.pauseVideo(); // If not preloading link the 2 players CUEING events
      } else if (!this.props.vID2) {
        console.log("cccc");
        this.player1.seekTo(1);
      }
    } else if (event.data === ENDED) {
      this.player2.stopVideo(); // If not preloading link the 2 players ENDING events
    } else if (event.data === UNSTARTED) {
      if (this.done1 === 1) {
        this.done1 = 2;
        //this.player1.stopVideo();
        this.player1.seekTo(2);
        this.player1.playVideo();
        console.log("doneeeeeeee 1");
      }
    }
  };

  onPlayer2StateChange = (event) => {
    console.log("2 " + event.data);
    if (event.data === PLAYING) {
      if (this.preloading2) {
        //prompt("Foreground ready");
        this.player2.pauseVideo(); // Pause the video
        this.player2.seekTo(0); // Rewind
        this.player2.unMute(); // Unmute
        this.preloading2 = false;
        //this.player2.playVideo();
        /*$( "#player2" ).show(50, function() {
                                    });
                                    */
      } else this.player1.playVideo();
    } else if (event.data === PAUSED) {
      if (/*!preloading1 &&*/ !this.preloading2) {
        this.player1.pauseVideo();
        this.done2 = 0;
        this.setState({ ready: true });
      }
    } else if (event.data === BUFFERING) {
      if (!this.preloading2) {
        this.player1.pauseVideo();
        //player1.seekTo(... // Correct the offset here
      } else {
        this.done2 = 1;
      }
    } else if (event.data === CUED) {
      console.log(this.preloading2);
      if (!this.preloading2) this.player1.pauseVideo();
    } else if (event.data === ENDED) {
      this.player1.stopVideo();
    } else if (event.data === UNSTARTED) {
      if (this.done2 === 1) {
        this.done2 = 2;
        this.player2.playVideo();
        console.log("doneeeeeeee");
      }
    }
  };

  // render
  render() {
    const { classes } = this.props;
    const opts1 = { playerVars: { showinfo: 0, modestbranding: true, controls: 0, loop: 1, mute: 1 } };
    const opts2 = { playerVars: { showinfo: 0, modestbranding: true, controls: 0, loop: 1 } };
    if (!this.inited && this.state.ready1 && this.state.ready2 && this.state.documentLoaded) {
      console.log("aaaaaaaaaaaaaaaaaa");
      this.inited = true;
      this.player1Ready = true;
      this.preloading1 = true; // Flag the player 1 preloading
      //this.player1.mute(); // Mute the player 1
      //this.player1.hide(); // Hide it todo
      //this.player1.seekTo(1); // Start the preloading and wait a state change event
      this.player1.seekTo(1); // Start the preloading and wait a state change event
      this.player2Ready = true; // The foreground video player is not preloaded here
    }
    if (this.firstRender && !this.props.vID2) {
      this.firstRender = false;
      //this.loadPostFromDatabase();
      console.log("gg wallet");
    }
    return (
      <div>
        <h1>{this.title}</h1>
        <Link to={"/user/" + this.props.uid}>{"By: " + this.username}</Link>
        <div className={classes.parentDiv}>
          <div className={classes.childDiv}>
            <YouTube
              videoId={this.vID1}
              opts={opts1}
              onReady={this.onPlayer1Ready}
              onStateChange={this.onPlayer1StateChange}
            />
          </div>
          <div
            className={classes.childDiv}
            style={{
              clipPath:
                "polygon(" + this.state.videoDivide + "% 0%, " + this.state.videoDivide + "% 100%, 100% 100%, 100% 0%)",
            }}
          >
            <YouTube
              videoId={this.vID2}
              opts={opts2}
              onReady={this.onPlayer2Ready}
              onStateChange={this.onPlayer2StateChange}
            />
          </div>
        </div>
        <div>
          <Button disabled={!this.state.ready} variant="contained" style={{ marginRight: 16 }} onClick={this.clickSFX}>
            Toggle SFX
          </Button>
          <Button onClick={() => this.player1.seekTo(1)}>1111</Button>
          <Button
            disabled={!this.state.ready}
            variant="contained"
            style={{ marginRight: 16 }}
            onClick={this.clickPause}
          >
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
