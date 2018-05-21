import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import GDB from './GDB'

const Q = gql`
query GDBS {
  GDBS {
    gdbno
    customer
    createdBy
    creationDate
    status {
      statusType
      statusDate
      statusDesc
    }
  }
}
`

const Gdbs = () => (
  <Query query={Q}>
  {({ data, loading, error }) => {
    if (loading) {
      console.log('LOADING')
      return (<h1>LOADING</h1>)
    } else if (error) {
      return (<h1>ERROR { error }</h1>)
    } else {
      if (data) {
        console.log('GDBS')

        return (
          <div>
            GDBS - { data.GDBS.length }
            { data.GDBS.map(g => <GDB key={g.gdbno} gdb={g}/>)}
          </div>
        )
      }
    }
  }}
  </Query>
)

export default Gdbs
