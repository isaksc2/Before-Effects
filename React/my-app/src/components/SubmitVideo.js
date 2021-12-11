import React, { Component, Uploader, MediaUploader } from 'react'
import { Button } from '@material-ui/core'
import ReactDOM from 'react-dom';
import GoogleLogin from 'react-google-login';
//import { Uploader } from 'rsuite';

export default class SubmitVideo extends Component {




    render() {
        return (
            <div>
                <Button variant="contained">submit video</Button>
            </div>

        )
    }
}


/*
var uploader = new MediaUploader({
    baseUrl: "https://www.googleapis.com/upload/youtube/v3/videos",
    file: ".\videos\desktopTest.mp4",
    token: this.accessToken,
    metadata: metadata,
    params: {
        part: Object.keys(metadata).join(",")
    },
    onError: function (data) {
        // onError code
    }.bind(this),
    onProgress: function (data) {
        // onProgress code
    }.bind(this),
    onComplete: function (data) {
        // onComplete code
    }.bind(this)
});

var metadata = {
    snippet: {
        title: "test title",
        description: "test desc",
        tags: "videogame",
        categoryId: 22
    },
    status: {
        privacyStatus: "private",
        embeddable: true
    }
};

const responseGoogle = (response) => {
    console.log(response);
}

ReactDOM.render(
    <GoogleLogin
        clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={this.responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
    />,
    document.getElementById('googleButton')
);
*/