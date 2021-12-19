import React, { Component } from 'react'

export default class Thumbnail extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
            </div>
        )
    }
}
