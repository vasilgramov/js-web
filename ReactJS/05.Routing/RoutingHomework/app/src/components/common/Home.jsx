import React, { Component } from 'react'

import SignIn from '../authentication/SignIn'

import NavigationBar from '../NavigationBar'
import Main from '../Main'

class Home extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        if (localStorage.getItem('token')) {
            return (
                <div>
                    <NavigationBar />
                    <Main />
                </div>
            )
        } else {
            return (
                <SignIn />
            )
        }
    }
}

export default Home