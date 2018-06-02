import React from 'react'

import styles from '../css/style.css'

import Gdbs from './Gdbs'
import Search from './Search'

class App extends React.Component {

  newGDB () {
    // Todo: Create new gdb
    alert('new GDB')
  }

  render () {
    return (
      <div className='container'>
        <div className='header'>
          <div className='logo'>GDB Tracker</div>
          <div className='header-main' />
          <div className='header-add'><span onClick={this.newGDB}>[+]</span></div>
          <div className='search'><Search /></div>
        </div>
        <div className='main'>
          <Gdbs />
        </div>
      </div>
    )
  }
}

export default App
