import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';

class Header extends Component {

    constructor(props) {
        super(props)

        this.onLogout = this.onLogout.bind(this)
    }

    onLogout() {
        localStorage.clear()
        this.props.history.push('/')
    }

    render() {
        const loggedIn = localStorage.getItem('auth-token')
        const name = localStorage.getItem('name')

        return (
            <header>
                <span>Hotel System</span>
                <NavLink exact to="/" activeClassName="active">Home</NavLink>
                {loggedIn && <NavLink to="/create" activeClassName="active">Create Hotel</NavLink>}
                {loggedIn && <span>Hello, {name}</span>}
                {loggedIn && <a href="javascript:void(0)" onClick={this.onLogout}>Logout</a>}
                {!loggedIn && <NavLink to="/login" activeClassName="active">Login</NavLink>}
                {!loggedIn && <NavLink to="/register" activeClassName="active">Register</NavLink>}
            </header>
        );
    }
}

export default withRouter(Header)