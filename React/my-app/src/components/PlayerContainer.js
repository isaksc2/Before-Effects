import React from 'react'
import { Text } from 'react';
import { Button, TextField, Slider } from '@material-ui/core';
import { Component, View } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import YouTube from 'react-youtube';
//const [youtubeID] = useState('fAoRpLbJSVU')

const styles = theme => ({
    parentDiv: {
        display: "grid",
        gridTemplateColumns: "1fr",
        padding: "0px", // 50
        backgroundColor: "rgba(0,0,0,0.5)",
        gridRowStart: 1,
        gridColumnStart: 1
    },
    childDiv: {
        gridColumn: 1,
        gridRow: 1
    }
});


class PlayerContainer extends Component {
    // constructor
    constructor(props) {
        super(props);
        this.state = {
            player: [],
            videoDivide: 50,
            paused: true
        };
        this._onReady = this._onReady.bind(this);
        this.clickPause = this.clickPause.bind(this);
    }

    // add youtube player to list of players
    _onReady(event) {
        const player = this.state.player;
        player.push(event.target);
        this.setState({
            player: player
        });
    }

    // pause videos
    clickPause() {
        const paused = this.state.paused;
        this.state.player.forEach((player) => {
            if (paused) {
                player.playVideo();
            }
            else {
                player.pauseVideo();
            }
        });

        this.setState({ paused: !paused })
    }

    slided() {

    }

    // render
    render() {
        //const classes = styles();
        const { classes } = this.props;
        return (
            <div>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <div className={classes.parentDiv}>
                    <div className={classes.childDiv}>
                        <YouTube videoId="SgbF2WRkwgM" onReady={this._onReady} />
                    </div>
                    <div className={classes.childDiv} style={{ clipPath: "polygon(" + this.state.videoDivide + "% 0%, " + this.state.videoDivide + "% 100%, 100% 100%, 100% 0%)" }} >
                        <YouTube videoId="fAoRpLbJSVU" onReady={this._onReady} />
                    </div>
                </div>
                <Button variant="contained" onClick={this.clickPause}>{(this.state.paused) ? "play" : "pause"}</Button>
                <div style={{ marginLeft: "0%", marginRight: "0%" }}>
                    <Slider defaultValue={this.state.videoDivide} step={0.1} onChange={(e, val) => this.setState({ videoDivide: val })} >
                    </Slider>

                </div>

            </div>
        )
    }
}




export default withStyles(styles)(PlayerContainer);


