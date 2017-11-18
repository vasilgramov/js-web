import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './components/common/Header'
// import Footer from './components/common/Footer'

import HomePage from './components/home-page/HomePage'

import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'

// import CreatePage from './components/crud/CreatePage'

class App extends Component {

  render() {
    return (
      <div className="App">

        <Header />

        <Switch>
          <Route exact path="/" component={HomePage} />

          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          

          {/* <Route path="/create" component={CreatePage} /> */}
          {/* <PrivateRoute path="/details/:id" component={DetailsPage} /> */}
        </Switch>

      </div>
    )
  }
}

export default App
