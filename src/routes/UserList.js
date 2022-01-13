import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import Thumbnail from '../components/Thumbnail';
import { getDoc, doc } from 'firebase/firestore/lite';
import { db } from '../Firebase';
import { MAX_USERNAME_LENGTH } from '../Constants';
import { TextField } from '@material-ui/core';


export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nEntries: 5,
            entries: [],
            username: "Guest",
            tempUsername: "Guest",
            editingUsername: false
        };
        this.getEntries();
    }

    // get entries for thumbnails
    getEntries = async () => {
        try {
            console.log(this.props.uid)
            const previousVideos = await getDoc(doc(db, "videos", this.props.uid));
            if (previousVideos.exists()) {
                var _doc = previousVideos.data()
                // parse document
                const _entries = _doc.links.split("¤")
                var __entries = [];
                for (let i=0; i < _entries.length; i++) {
                    __entries[i] = _entries[i].split(";");
                }
                this.setState({entries: __entries});
                if (_doc.username) {
                    this.setState({username: _doc.username})
                } else {
                }
            } else {
                this.setState({entries: []});
            }
        } catch (e) {
            console.log("failed to read existing videos");
        }
    }

    // check if username valid
    checkInput = (target) => {
        
        // not too long username
        if (target.value.length > MAX_USERNAME_LENGTH) {
            target.value = target.value.substring(0,MAX_USERNAME_LENGTH)
            this.setState({tempUsername: target.value})
        }
    }

    editUsernameIcon = (editingUsername) => {
        return editingUsername ? "Save" : "Edit"
    }

    editUsername = () => {
        var currentState = this.state.editingUsername
        // if click "save" --> save username
        if (currentState) {
            this.setState({username: this.state.tempUsername})
        }
        this.setState({editingUsername: !currentState})

    }

    render() {
        return (
            <div>
                <TextField 
                    disabled = {!this.state.editingUsername}
                    onChange={(e) => this.checkInput(e.target)} 
                    defaultValue = {this.state.username}
                    label = "Username">
                </TextField>
                <Button onClick={this.editUsername}>{this.editUsernameIcon(this.state.editingUsername)}</Button>
                <div>
                    {this.state.entries.map(entry => (
                       <Thumbnail vID1={entry[0]} vID2={entry[1]} title={entry[2]}></Thumbnail>
                    ))}
                </div>
            </div>
        )
    }
}
