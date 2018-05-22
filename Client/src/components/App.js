import React from 'react'
import axios from 'axios'
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

  componentDidMount () {
    // this.onFetchFromDB()
  }

  onFetchFromDB () {    
    /* axiosGraphql
      .post('', {query: query})
      .then(result => {
        this.setState({gdbs: result.data.data.GDBS})
      })
      .catch(err => console.log(`Error: ${err}`)) */
  }

  render () {
    console.log(styles)
    return (
      <div className='container'>
        <div className='header'>
          <div className='logo'>
            GDB Tracker
          </div>
          <div className='header-middle'>

          </div>
          <div className='search'>
            <input type='text' />
          </div>
        </div>  
        <div className='main'>
          <Gdbs />
        </div>
      </div> 
    )
  }
}

export default App
