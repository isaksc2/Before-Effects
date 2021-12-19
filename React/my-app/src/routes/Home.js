import React, { Component } from 'react'
import SubmitVideo from '../components/SubmitVideo';
import PlayerContainer from '../components/PlayerContainer';

export default class Home extends Component {
    render() {
        return (
            <div>
                <SubmitVideo />
                <PlayerContainer />
            </div>
        )
    }
}

