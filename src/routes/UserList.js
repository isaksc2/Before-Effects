import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import Thumbnail from '../components/Thumbnail';
import { getDoc, doc } from 'firebase/firestore/lite';
import { db } from '../Firebase';

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nEntries: 5,
            entries: []
        };
        this.getEntries();
    }

    // get entries for thumbnails
    getEntries = async () => {
        try {
            console.log(this.props.uid)
            const previousVideos = await getDoc(doc(db, "videos", this.props.uid));
            if (previousVideos.exists()) {
                // parse document
                const _entries = previousVideos.data().links.split("¤")
                var __entries = [];
                for (let i=0; i < _entries.length; i++) {
                    __entries[i] = _entries[i].split(";");
                }
                this.setState({entries: __entries});
            } else {
                this.setState({entries: []});
            }
        } catch (e) {
            console.log("failed to read existing videos");
        }
    }


    render() {
        return (
            <div>
                <Button>Videos by: {this.props.uid}</Button>
                <div>
                    {this.state.entries.map(entry => (
                       <Thumbnail vID1={entry[0]} vID2={entry[1]} title={entry[2]}></Thumbnail>
                    ))}
                </div>
            </div>
        )
    }
}
