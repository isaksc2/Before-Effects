import React, { Component } from 'react'
import CustomButton from './CustomButton'
import logo from '../images/logo.svg'
import logoMobile from '../images/logoMobile.svg'
import { Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Link } from "react-router-dom"
import { authentication } from '../Firebase'
import SubmitVideo from './SubmitVideo'

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sticky: true,
            user: ""
        };
        this.handleUserChange = this.handleUserChange.bind(this);
    }

    handleUserChange(uid) {
        this.setState({ user: uid })
    }

    render() {

        return (
            <Toolbar position="sticky">
                <Link to="/" style={{ marginRight: 16 }}>Start page</Link>
                <Link to={"/user/" + this.state.user} style={{ marginRight: 16 }}>User page</Link>
                <SubmitVideo onUserChange={this.handleUserChange} />
            </Toolbar>
        )
    }
}