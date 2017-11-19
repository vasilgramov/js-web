import React, { Component } from 'react'
import Input from '../common/Input'
import { login } from '../../api/remote'
import { withRouter } from 'react-router-dom'

import toastr from 'toastr'

class LoginPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            error: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.successfullyLogin = this.successfullyLogin.bind(this)
        this.getErrors = this.getErrors.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    async onSubmit(e) {
        e.preventDefault()

        if (!await this.successfullyLogin()) {
            return
        }

        this.props.history.push('/yearly')
    }

    async successfullyLogin() {
        const res = await login(this.state.email, this.state.password)
        if (!res.success) {
            this.setState({ error: res.message })

            return false
        } else {
            localStorage.setItem('auth-token', res.token)
            localStorage.setItem('name', res.user.name)

            toastr.success('Logged in!')
        }

        return true
    }

    getErrors() {
        if (this.state.error) {
            return (
                <p>{this.state.error}</p>
            )
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row space-top">
                    <div className="col-md-12">
                        <h1>Login</h1>

                        {this.getErrors()}
                    </div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="row space-top">
                        <div className="col-md-3">
                            <Input
                                name="email"
                                type="email"
                                value={this.state.email}
                                onChange={this.onChange}
                                label={"Email"}
                            />
                            <Input
                                name="password"
                                type="password"
                                value={this.state.password}
                                onChange={this.onChange}
                                label={"Password"}
                            />

                            <input type="submit" className="btn btn-secondary" value="Login" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(LoginPage)