import React, { Component } from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

class Logout extends Component {

    componentDidMount() {
        localStorage.clear();
    }

    render() {
        return(
            <Redirect to='/'/>
        )
    }
}

export default Logout