import React, { Component } from 'react'
import './App.css'

import SingUpForm from './components/form/SingUpForm'
import LoginForm from './components/form/LoginForm'

import PokemonForm from './components/form/PokemonForm'
import PokemonHolder from './components/form/PokemonHolder'

class App extends Component {

  constructor() {
    super()

    this.state = {
      username: '',
      token: '',
      displayLoginRegister: localStorage.getItem('auth')
    }

    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(username, token, data) {

    localStorage.setItem('auth', token)

    this.setState({
      username: username,
      token: token,
      displayLoginRegister: data
    })
  }

  render() {

    if (!(localStorage.getItem('auth'))) {
      return (
        <div>
          <SingUpForm />
          <LoginForm func={this.handleLogin} />
        </div>
      )
    } else {
      return (
        <div>
          <h1> Logged </h1>
          <PokemonForm />
          <PokemonHolder />
        </div>
      )
    }
  }
}

export default App
