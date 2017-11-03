import React, { Component } from 'react'

import validationFunc from './../../utils/formValidator'
import Input from './formFields/Input'

class LoginForm extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: ''
        }
    }

    submitLogin(e) {
        e.preventDefault()

        let payload = {
            email: this.state.email,
            password: this.state.password
        }

        this.login(payload)
    }

    login(payload) {
        fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then((res) => {
            return res.json()
        })
        .then((d) => {

            let username = d.user.name
            let token = d.token
            let toDisplayRegisterAndLogin = false

            this.props.func(d.user.name, d.token, false)
        })
    }

    render() {

        let validator = validationFunc(
            this.state.email,
            this.state.email,
            'Vladix',
            this.state.password,
            this.state.password
        )

        return (
            <form onSubmit={this.submitLogin.bind(this)}>
                <fieldset className='App'>
                    <div style={{ display: 'inline-grid' }}>
                        <h2>Login</h2>
                        <Input
                            type='text'
                            data='email'
                            name='email'
                            func={e => {
                                this.setState({ email: e.target.value })
                            }}
                            valid={validator.validMail}
                        />
                        <Input
                            type='password'
                            data='password'
                            name='password'
                            func={e => {
                                this.setState({ password: e.target.value })
                            }}
                            valid={validator.validPassword}
                        />

                        <input
                            style={({ "display": (validator.validMail && validator.validPassword) === true ? '' : 'none' })}
                            type='submit'
                            value='Login'
                        />
                    </div>
                </fieldset>
            </form>
        )
    }
}

export default LoginForm