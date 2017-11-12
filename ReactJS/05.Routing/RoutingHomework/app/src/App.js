import './App.css';

import { Switch, Route, Redirect } from 'react-router-dom'
import React, { Component } from 'react';

import Header from './components/common/Header';
import Footer from './components/common/Footer'

import Home from './components/common/Home'
import Logout from './components/authentication/Logout'

import CreateArticle from './components/CreateArticle'
import DeleteArticle from './components/DeleteArticle'

class App extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="container">

        <Header />

        <div className="content">

          <Switch>

            <Route exact path='/' component={Home} />
        
            <Route path='/logout' component={Logout} />

            <Route path="/create" component={CreateArticle} />

            <Route path='/delete/:id' component={DeleteArticle} />

          </Switch>

        </div>

        <Footer />

      </div>
    );
  }
}

export default App;
