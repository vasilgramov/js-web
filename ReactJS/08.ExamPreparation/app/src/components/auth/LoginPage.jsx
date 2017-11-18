import React, { Component } from 'react'
import Input from '../common/Input'
import { login } from '../../api/remote'
import { withRouter } from 'react-router-dom'

class LoginPage extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            email: '',
            password: '',
            error: false
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

        this.props.history.push('/')
    }

    async successfullyLogin() {
        const res = await login(this.state.email, this.state.password)
        console.log(res)

        if (!res.success) {
            this.setState({ error: res })

            return false
        } else {
            localStorage.setItem('auth-token', res.token)
            localStorage.setItem('name', res.user.name)
        }

        return true
    }

    getErrors() {
        let errors = null
        if (this.state.error) {
            errors = (
                <div>
                    <h2 className="errorMessage">{this.state.error.message}</h2>
                </div>
            );
        }

        return errors
    }

    render() {
        const errors = this.getErrors()

        return (
            <div className="container">
                <h1>Login</h1>
                {errors}
                <form onSubmit={this.onSubmit}>
                    <Input
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        label="E-mail: "
                    />
                    <Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        label="Password: "
                    />
                    <input type="submit" className="btn btn-primary" value="Login" />
                </form>
            </div>
        )
    }
}

export default withRouter(LoginPage)