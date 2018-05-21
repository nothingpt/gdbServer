import React from 'react'
import axios from 'axios'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'

import Gdbs from './Gdbs'

const axiosGraphql = axios.create({
  baseURL: 'http://localhost:3000/graphql'
})

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
    return (
      <Gdbs />
    )
  }
}

export default App
