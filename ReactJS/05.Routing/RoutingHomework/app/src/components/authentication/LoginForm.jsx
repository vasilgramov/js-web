import React, { Component } from 'react';
import { Redirect } from 'react-router'

import constants from '../../utils/constants';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubit = this.onSubit.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubit(e) {
        e.preventDefault();

        let data = {
            username: this.state.username,
            password: this.state.password
        };

        fetch('https://baas.kinvey.com/user/' + constants.appKey + '/login', {
            method: 'POST',
            headers: {
                Authorization: 'Basic ' + btoa(constants.appKey + ':' + constants.appSecret),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json();
        }).then((data) => {
            localStorage.setItem('token', data._kmd.authtoken);
            localStorage.setItem('username', data.username)

            this.setState({ fireRedirect: true })
        });

        
    }

    render() {
        
        if (this.state.fireRedirect) {
            return <Redirect to='/' />
        }

        return (
            <form onSubmit={this.onSubit} id="loginForm">
                <h2>Sign In</h2>
                <label>Username:</label>
                <input onChange={this.onChange} name="username" type="text" />
                <label>Password:</label>
                <input onChange={this.onChange} name="password" type="password" />
                <input id="btnLogin" value="Sign In" type="submit" />
            </form>
        )
    }
}


export default LoginForm;