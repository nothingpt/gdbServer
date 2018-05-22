import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import styles from '../css/style.css'

import Gdbs from './Gdbs'

const gQUERY = gql`
    query GDBS {
    gdbno
    createdBy
    creationDate
    customer
    active
    status {
      statusType
      statusDate
      statusDesc
    }
  }
`

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      gdbs: []
    }
  }

  render () {
    return (
      <div className='container'>
        <div className='header'>
          <div className="logo">GDB Tracker</div>
          <div className="header-main"></div>
          <div className="search"><input type='text' placeholder='GDB no' /></div>
        </div>  
        <div className='main'>
        </div>
      </div> 
    )
  }
}

export default App
