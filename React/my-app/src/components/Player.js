import React from 'react'
import { Text } from 'react';
import { Button, TextField } from '@material-ui/core';

import YouTube from 'react-youtube';
//const [youtubeID] = useState('fAoRpLbJSVU')

export default function Player() {
    return (
        <div>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
            <YouTube videoId="fAoRpLbJSVU" />
            <Button variant="contained" onClick={pause}>Contained</Button>
        </div>
    )
}

function pause() {
    alert("pause")
}


