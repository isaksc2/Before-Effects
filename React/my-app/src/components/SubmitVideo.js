import React, { Component, Uploader, MediaUploader } from 'react';
//import type {TextInput} from "react-native";
import { Button, TextField } from '@material-ui/core'
//import { Uploader } from 'rsuite';
//import firebase from '../Firebase';
//import "firebase/firestore";
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore/lite"
//import { firebase } from "firebase/app";
//import "firebase/firestore";
//import "firebase/auth";
//import { useAuthState } from "react-firebase-hooks/auth";
//import { useCollectionData } from "react-firebase-hooks/firestore";

import { authentication, db } from '../Firebase.js';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


//const [user] = useAuthState(auth);

//const ref = firebase.firestore().collection("videos");

export default class SubmitVideo extends Component {


    constructor(props) {
        super(props);
        this.state = {
            toggleSFX: true
        };
        this._onClick = this._onClick.bind(this);
    }

    readDB = async () => {

        const videosCol = collection(db, "videos");
        const videosSnapshot = await getDocs(videosCol);

        const videoList = videosSnapshot.docs.map(doc => doc.data());

        console.log(videoList);
    }
    eHZapYhPFVfB8wBQrx13KyH2Mpz1
    sMtMpoHzgDb0he4SJJKskJuuafB2

    sendDB = async () => {
        //const firestore = firebase.firestore();
        //const videosCol = collection(db, "videos");
        const docRef = await addDoc(collection(db, "videos"), {
            userID: authentication().currentUser.uid,
            created: serverTimestamp(),
            latestWrite: serverTimestamp(),
            links: "sgdPlDG1-8k ENcnYh79dUY",
        });
    }

    googleSignIn = () => {
        //const firestore = firebase.firestore();
        //const videosCol = collection(db, "videos");
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication(), provider)
            .then((re) => {
                console.log(re);
            })
            .catch((err) => {
                console.log(err);
            })
    }

    async _onClick3() {
        const email = "a.b@c.com";
        const password = "1234567";
        signOut(authentication())
            .then(() => {
                console.log("signed out");
            })
            .catch((error) => {
                console.log("failed to signout");
            });
    }

    async _onClick2() {
        const email = "a.b@c.com";
        const password = "1234567";
        signInWithEmailAndPassword(authentication(), email, password)
    }

    async _onClick() {
        const email = "a.b@c.com";
        const password = "1234567";
        createUserWithEmailAndPassword(authentication(), email, password);
    }

    render() {
        return (
            <div>
                <Button variant="contained" onClick={this._onClick}>submit video register</Button>
                <Button variant="contained" onClick={this._onClick2}>submit video in</Button>
                <Button variant="contained" onClick={this._onClick3}>submit video out</Button>
                <Button variant="contained" onClick={this.readDB}>read db</Button>
                <Button variant="contained" onClick={this.sendDB}>send db</Button>
                <Button variant="contained" onClick={this.googleSignIn}>google in</Button>
                <TextField placeholder="hi" />
                <TextField placeholder="hi 2" />
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