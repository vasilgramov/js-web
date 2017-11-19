import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'

import Header from './components/common/Header'
import Footer from './components/common/Footer'

import YearlyPage from './components/yearly/YearlyPage'
import MonthlyPage from './components/monthly/MonthlyPage'

import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'

import AddExpense from './components/monthly/AddExpense'
import DeleteExpensive from './components/monthly/DeleteExpensive'

class App extends Component {

  render() {
    return (
      <div className="container">

        <Header />

        <main>
          <Switch>
            <Route path="/yearly" component={YearlyPage} />
            <Route path="/monthly/:year/:month" component={MonthlyPage} />

            <Route path="/addExpense/:year/:month" component={AddExpense} />
            <Route path="/delete/:id" component={DeleteExpensive}/>

            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
          </Switch>
        </main>

        <Footer />

      </div>
    )
  }
}

export default App