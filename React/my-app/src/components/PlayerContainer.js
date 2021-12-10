import React from 'react'
import { Text } from 'react';
import { Button, TextField } from '@material-ui/core';
import { Component } from 'react';

import YouTube from 'react-youtube';
//const [youtubeID] = useState('fAoRpLbJSVU')



export default class PlayerContainer extends Component {
    // constructor
    constructor(props) {
        super(props);
        this.state = {
            player: []
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
        this.state.player.forEach((player) => {
            player.pauseVideo();
        });
    }

    // render
    render() {
        return (
            <div>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" />
                <YouTube videoId="fAoRpLbJSVU" onReady={this._onReady} />
                <YouTube videoId="fAoRpLbJSVU" onReady={this._onReady} />
                <Button variant="contained" onClick={this.clickPause}>Contained</Button>
            </div>
        )
    }
}

//export default PlayerContainer;


