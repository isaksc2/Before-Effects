import React, { useState, useRef, useEffect } from "react";
import { Button, Slider } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { UNSTARTED, ENDED, PLAYING, PAUSED, BUFFERING, CUED } from "../Constants.js";
import YouTube from "react-youtube";
import GetCursorPosition from "cursor-position";

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
  wrapper: {
    pointerEvents: "none",
    gridColumn: 1,
    gridRow: 1,
  },
});

// fixes react-youtube error (?)
window.YTConfig = {
  host: "https://www.youtube.com",
};

const CustomSlider = withStyles({
  root: {
    color: "#52af77",
    height: 8,
    "&$vertical": {
      width: 8,
    },
  },
  thumb: {
    height: 340,
    width: 4,
    color: "#fff",
    borderRadius: 0,
    //backgroundColor: "#fff",
    //border: "2px solid currentColor",
    //marginTop: 0,
    marginBottom: 0,
    marginLeft: -2,
    "&:focus, &:hover": {
      boxShadow: "0px 0px 0px 8px rgba(84, 199, 97, 0.16)",
    },
    "&$active": {
      boxShadow: "0px 0px 0px 12px rgba(84, 199, 97, 0.16)",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 0,
    borderRadius: 4,
  },
  rail: {
    height: 0,
    borderRadius: 4,
  },
  vertical: {
    "& $rail": {
      width: 8,
    },
    "& $track": {
      width: 8,
    },
    "& $thumb": {
      marginLeft: -8,
      marginBottom: -11,
    },
  },
})(Slider);

function PlayerContainer(props) {
  const [videoDivide, setVideoDivide] = useState(50);
  const [paused, setPaused] = useState(true);
  const [cursorX, setCursorX] = useState(30);
  const [cursorY, setCursorY] = useState(30);
  const cursorRadius = 10;
  const player1 = useRef(null);
  const player2 = useRef(null);
  //var player1.currentReady = false;
  //var player2.currentReady = false;
  const preloading1 = useRef(false);
  const preloading2 = useRef(false);
  const done2 = useRef(false);

  if (props.uid) {
    // prettify url
    window.history.replaceState(null, "Video post", "/user/" + props.uid + "/" + props.postID);
  }

  // toggle pause
  const clickPause = () => {
    if (paused) {
      player1.current.playVideo();
      player2.current.playVideo();
    } else {
      player1.current.pauseVideo();
      player2.current.pauseVideo();
    }
    setPaused(!paused);
  };

  // toggle audio
  const clickSFX = () => {
    if (player1.current.isMuted()) {
      player1.current.unMute();
      player2.current.mute();
    } else {
      player2.current.unMute();
      player1.current.mute();
    }
  };

  // syncing logic
  const onplayer1Ready = (event) => {
    if (!player1.current) {
      player1.current = event.target;
    }
    // player1.currentReady = true; todo - not used?
    preloading1.current = true; // Flag the player 1 preloading
    //player1.current.mute(); // Mute the player 1
    //player1.current.hide(); // Hide it todo
    player1.current.seekTo(1); // Start the preloading and wait a state change event
  };

  const onplayer2Ready = (event) => {
    if (!player2.current) {
      player2.current = event.target;
    }
    //player2.currentReady = true; // The foreground video player is not preloaded here
  };

  const onplayer1StateChange = (event) => {
    if (event.data === PLAYING) {
      if (preloading1.current) {
        //alert("Background ready"); // For testing
        player1.current.pauseVideo(); // Pause the video
        player1.current.seekTo(0); // Rewind
        //player1.current.unMute(); // Comment this after test
        //$( "#player1.current" ).show();         // Show the player
        preloading1.current = false;

        //player2.currentReady = true;
        preloading2.current = true; // Flag for foreground video preloading
        player2.current.mute();
        //$( "#player2.current" ).hide();
        player2.current.seekTo(1); // Start buffering and wait the event
      } else player2.current.playVideo(); // If not preloading link the 2 players PLAY events
    } else if (event.data === PAUSED) {
      if (!preloading1.current) player2.current.pauseVideo(); // If not preloading link the 2 players PAUSE events
    } else if (event.data === BUFFERING) {
      if (!preloading1.current) {
        player2.current.pauseVideo(); // If not preloading link the 2 players BUFFERING events
      }
    } else if (event.data === CUED) {
      if (!preloading1.current) player2.current.pauseVideo(); // If not preloading link the 2 players CUEING events
    } else if (event.data === ENDED) {
      player2.current.stopVideo(); // If not preloading link the 2 players ENDING events
    }
  };

  const onplayer2StateChange = (event) => {
    if (event.data === PLAYING) {
      if (preloading2.current) {
        //prompt("Foreground ready");
        player2.current.pauseVideo(); // Pause the video
        player2.current.seekTo(0); // Rewind
        player2.current.unMute(); // Unmute
        preloading2.current = false;
        //player2.current.playVideo();
        /*$( "#player2.current" ).show(50, function() {
                                    });
                                    */
      } else player1.current.playVideo();
    } else if (event.data === PAUSED) {
      if (/*!preloading1.current &&*/ !preloading2.current) player1.current.pauseVideo();
    } else if (event.data === BUFFERING) {
      if (!preloading2.current) {
        player1.current.pauseVideo();
        //player1.current.seekTo(... // Correct the offset here
      } else {
        done2.current = true;
      }
    } else if (event.data === CUED) {
      if (!preloading2.current) player1.current.pauseVideo();
    } else if (event.data === ENDED) {
      player1.current.stopVideo();
    } else if (event.data === UNSTARTED) {
      if (done2.current) {
        done2.current = false;
        player2.current.playVideo();
      }
    }
  };

  const MouseArea = React.forwardRef((props, ref) => {
    return (
      <div
        ref={ref}
        className={classes.childDiv}
        hidden={false}
        style={{ zIndex: 1000, position: "relative", color: "#00f000", pointerEvents: "none" }}
        //onMouseMove={_onMouseMove.bind(this)}
      ></div>
    );
  });
  const mouseArea = useRef(null);
  //console.log(mouseArea.current);

  useEffect(() => {
    //mouseArea.current.style.pointerEvents = "auto";
    //mouseArea.current.addEventListener("mousemove", _onMouseMove);

    document.addEventListener("mousemove", () => {
      if (!mouseArea.current) {
        return;
      }
      const { x, y } = GetCursorPosition();
      //console.log(x, y);
      const rect = mouseArea.current.getBoundingClientRect();
      const x2 = (100 * (x - rect.left)) / rect.width; //x position within the element.
      const y2 = (100 * (y - rect.top)) / rect.height; //y position within the element.
      setCursorX(x2);
      setCursorY(y2);
    });

    return () => {
      //console.log("removed");
      //mouseArea.current.removeEventListener("mousemove", _onMouseMove);
    };
    // eslint-disable-next-line
  }, []);

  // render
  const { classes } = props;
  const opts1 = { playerVars: { showinfo: 0, modestbranding: true, controls: 0, loop: 1, mute: 1 } };
  const opts2 = { playerVars: { showinfo: 0, modestbranding: true, controls: 0, loop: 1 } };
  const polygon =
    "polygon(" +
    videoDivide +
    "% 0%, " +
    videoDivide +
    "% " +
    cursorY +
    "%, " +
    (cursorX + cursorRadius) +
    "% " +
    cursorY +
    "%, " +
    cursorX +
    "% " +
    (cursorY - cursorRadius) +
    "%, " +
    (cursorX - cursorRadius) +
    "% " +
    cursorY +
    "%, " +
    cursorX +
    "% " +
    (cursorY + cursorRadius) +
    "%, " +
    (cursorX + cursorRadius) +
    "% " +
    cursorY +
    "%, " +
    videoDivide +
    "% " +
    cursorY +
    "%, " +
    videoDivide +
    "% 100%, 100% 100%, 100% 0%)";
  return (
    <div style={{}}>
      <h1>{props.title}</h1>
      <Link to={"/user/" + props.uid} hidden={!props.username} color="inherit">
        {"By: " + props.username}
      </Link>
      <div className={classes.parentDiv}>
        <MouseArea ref={mouseArea}>aaaa</MouseArea>
        <div className={classes.childDiv}>
          <YouTube videoId={props.vID1} opts={opts1} onReady={onplayer1Ready} onStateChange={onplayer1StateChange} />
        </div>
        <div className={classes.childDiv} style={{ clipPath: polygon }}>
          <YouTube videoId={props.vID2} opts={opts2} onReady={onplayer2Ready} onStateChange={onplayer2StateChange} />
        </div>
        <div className={classes.childDiv}>
          <CustomSlider value={videoDivide} step={0.1} onChange={(e, val) => setVideoDivide(val)}></CustomSlider>
        </div>
      </div>
      <div>
        <Button variant="contained" style={{ marginRight: 16 }} onClick={clickSFX}>
          Toggle SFX
        </Button>
        <Button variant="contained" style={{ marginRight: 16 }} onClick={clickPause}>
          {paused ? "play" : "pause"}
        </Button>
      </div>
    </div>
  );
}

export default withStyles(styles)(PlayerContainer);
