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
        return (<h1>LOADING</h1>)
      } else if (error) {
        return (<h1>ERROR { error }</h1>)
      } else {
        if (data) {
          return (
            <div className='gdbListContainer'>
              <div className='GDBtotal'>
                Number of GDBS - { data.GDBS.length }
              </div>
              <div className='GDBList'>
                { data.GDBS.map(g => <GDB key={g.gdbno} gdb={g} />)}
              </div>
            </div>
          )
        }
      }
    }}
  </Query>
)

export default Gdbs
