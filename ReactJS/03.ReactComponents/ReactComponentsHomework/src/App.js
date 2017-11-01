import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'

import Slider from './components/Slider'
import Roster from './components/Roster'
import Detail from './components/Detail'

class App extends Component {

  render() {
    return (
      <div>
        <Slider />

        <Roster />

        <Detail />
      </div>
    )
  }
}

export default App
