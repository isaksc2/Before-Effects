import React, { Component, Uploader, MediaUploader } from 'react';
import { Button } from '@material-ui/core'
import { collection, getDocs, getDoc, setDoc, doc, serverTimestamp } from "firebase/firestore/lite"
import { COOLDOWN, COOLDOWN_MARGIN } from '../Constants.js';
import { authentication, db } from '../Firebase.js';
import { googleSignIn } from './SignInOut.js';



export default class SubmitVideo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleSFX: true
        };
    }


    readDB = async () => {
        const videosCol = collection(db, "videos");
        const videosSnapshot = await getDocs(videosCol);
        const videoList = videosSnapshot.docs.map(doc => doc.data());
        console.log(videoList);
    }

    dbErrorInfo = (document) => {
        if (authentication.currentUser.uid == null) {
            console.log("you are not logged in");
        }
        if (document != null) {
            // always want to print when not reach cooldown
            // ok to print when not reached cooldown yet
            const remainingTime = document.data().latestWrite.seconds + COOLDOWN - (Date.now() / 1000);
            if (remainingTime > 0 - COOLDOWN_MARGIN) {
                console.log("You are editing your portfolio too often, wait " + Math.ceil(remainingTime + 1) + " seconds");
            }
        }
    }

    // create or update a user's document
    sendDB = async () => {
        // if previous document exists, use old "created"-value
        var newCreated = null;
        var previousVideos = null;
        const currentUser = authentication.currentUser;
        // if not logged in, log in and retry? need "delay" to wait for login?
        if (currentUser == null) {
            console.log("user not logged in")
            googleSignIn();
            //this.sendDB();
            return;
        }
        console.log(authentication.currentUser.uid);
        try {
            previousVideos = await getDoc(doc(db, "videos", currentUser.uid));
            if (previousVideos.exists()) {
                newCreated = previousVideos.data().created;
            } else {
                newCreated = serverTimestamp();
                previousVideos = null;
            }
        } catch (e) {
            console.log("failed to search existing document");
            this.dbErrorInfo();
        }

        // update or create new document
        try {
            await setDoc(doc(db, "videos", currentUser.uid), {
                created: newCreated,
                latestWrite: serverTimestamp(),
                links: "sgdPlDG1-8k ENcnYh79dUY",
            });
        } catch (e) {
            console.log("failed to update document");
            this.dbErrorInfo(previousVideos);
        }
    }



    render() {
        return (
            <div>
                <Button variant="contained" onClick={this.readDB}>read db</Button>
                <Button variant="contained" onClick={this.sendDB}>send db</Button>
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