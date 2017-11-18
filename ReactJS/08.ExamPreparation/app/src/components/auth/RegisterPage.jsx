import React, { Component } from 'react'
import Input from '../common/Input'
import { register } from '../../api/remote'
import { withRouter } from 'react-router-dom'

class RegisterPage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name: '',
            email: '',
            password: '',
            repeatPassword: '',
            error: false
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)

        this.passwordsMatch = this.passwordsMatch.bind(this)
        this.successfullyRegistration = this.successfullyRegistration.bind(this)
        this.getErrors = this.getErrors.bind(this)        
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    async onSubmit(e) {
        e.preventDefault()

        if (!this.passwordsMatch()) {
            return
        }

        if (!await this.successfullyRegistration()) {
            return
        }

        this.props.history.push('/login')
    }

    passwordsMatch() {
        if (this.state.password !== this.state.repeatPassword) {
            this.setState({
                error: {
                    message: 'Check the registratino form for errors!',
                    errors: {
                        repeat: 'Passwords do not match!'
                    }
                }
            })

            return false
        }

        return true
    }

    async successfullyRegistration() {
        const res = await register(this.state.name, this.state.email, this.state.password)
        
        if (!res.success) {
            this.setState({ error: res })

            return false
        }

        return true
    }

    getErrors() {
        let errors = null
        if (this.state.error) {
            errors = (
                <div>
                    <h2 className="errorMessage">{this.state.error.message}</h2>
                    {
                        this.state.error.errors ?
                        Object.keys(this.state.error.errors).map(k => {
                            return <p key={k}>{this.state.error.errors[k]}</p>;
                        }) 
                        :
                        ''
                    }
                </div>
            );
        }

        return errors
    }

    render() {
        const errors = this.getErrors()

        return (
            <div className="container">
                <h1>Register</h1>
                {errors}
                <form onSubmit={this.onSubmit}>
                    <Input
                        name="name"
                        value={this.state.name}
                        onChange={this.onChange}
                        label={"Name: "}
                    />
                    <Input
                        name="email"
                        type="email"
                        value={this.state.email}
                        onChange={this.onChange}
                        label={"Email: "}
                    />
                    <Input
                        name="password"
                        type="password"
                        value={this.state.password}
                        onChange={this.onChange}
                        label={"Password: "}
                    />
                    <Input
                        name="repeatPassword"
                        type="password"
                        value={this.state.repeatPassword}
                        onChange={this.onChange}
                        label={"Repeat Password: "}
                    />

                    <input type="submit" className="btn btn-primary" value="Register" />
                </form>

            </div>
        )
    }
}

export default withRouter(RegisterPage)