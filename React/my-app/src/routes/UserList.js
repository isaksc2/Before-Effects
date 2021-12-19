import { Button } from '@material-ui/core'
import React, { Component } from 'react'
import Thumbnail from '../components/Thumbnail';

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nEntries: 5
        };
    }

    render() {
        return (
            <div>
                <Button>uid is: {this.props.uid}</Button>
                <Thumbnail title="Time"></Thumbnail>
                <Thumbnail title="Fall"></Thumbnail>
            </div>
        )
    }
}
