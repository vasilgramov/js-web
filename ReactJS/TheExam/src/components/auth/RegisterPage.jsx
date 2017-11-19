import React, { Component } from 'react'
import Input from '../common/Input'
import { register } from '../../api/remote'
import { withRouter } from 'react-router-dom'

import toastr from 'toastr'

class RegisterPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            email: '',
            password: '',
            repeatPassword: '',
            error: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.validateNameAndEmail = this.validateNameAndEmail.bind(this)
        this.passwordsMatch = this.passwordsMatch.bind(this)
        this.successfullyRegistration = this.successfullyRegistration.bind(this)
        this.getErrors = this.getErrors.bind(this)
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    async onSubmit(e) {
        e.preventDefault()

        if (!this.validateNameAndEmail) {
            return
        }

        if (!this.passwordsMatch()) {
            return
        }

        if (!await this.successfullyRegistration()) {
            return
        }

        toastr.success('Successfully registered!')
        this.props.history.push('/login')
    }

    validateNameAndEmail() {
        if (this.state.username.length === 0) {
            this.setState({ error: 'Username should not be empty!' })            
            return false
        }

        if (this.state.email.length === 0) {
            this.setState({ error: 'Email should not be empty!' })
            return false
        }

        return true
    }

    passwordsMatch() {
        if (this.state.password.length < 4 || this.state.repeatPassword.length < 4) {
            this.setState({ error: 'Passwords should have atleast 4 characters!' })
            return false
        }

        if (this.state.password !== this.state.repeatPassword) {
            this.setState({ error: 'Passwords should match!' })
            return false
        }

        return true
    }

    async successfullyRegistration() {
        const res = await register(this.state.username, this.state.email, this.state.password)

        if (!res.success) {
            this.setState({ error: res.message })
            return false
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
                        <h1>Register</h1>

                        {this.getErrors()}
                    </div>
                </div>
                <form onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="col-md-3">
                            <Input
                                name="username"
                                value={this.state.name}
                                onChange={this.onChange}
                                label={"Username"}
                            />
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
                            <Input
                                name="repeatPassword"
                                type="password"
                                value={this.state.repeatPassword}
                                onChange={this.onChange}
                                label={"Repeat Password"}
                            />

                            <input type="submit" className="btn btn-secondary" value="Register" />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(RegisterPage)