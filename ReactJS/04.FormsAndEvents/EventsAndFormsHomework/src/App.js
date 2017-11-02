import React, { Component } from 'react'
import './App.css'

import SingUpForm from './components/form/SingUpForm'
import LoginForm from './components/form/LoginForm'

class App extends Component {

  constructor() {
    super()

    this.state = {
      username: '',
      token: '',
      displayLoginRegister: true
    }
  }

  event() {
    // TODO: PASS FUNCTION TO PRERENDER STATE(LOGINFORM.JS)
  }

  render() {

    console.log(localStorage.getItem())

    if (this.state.displayLoginRegister) {
      return (
        <div>
          <SingUpForm />
          <LoginForm />
        </div>
      )
    } else {
      return (
        <div>

          {/* <AddPokemonForm /> */}
        </div>
      )
    }
  }
}

export default App
