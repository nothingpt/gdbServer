import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import GDB from './GDB'

const Q = gql`
query GDBS {
  getGDBS {
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
      console.log('Entering Query')
      if (loading) {
        alert('loading')
        return (<h1>LOADING!!!</h1>)
      } else if (error) {
        alert('error: ' + error)
        return (<h1>ERROR { error }</h1>)
      } else {
        alert('Entering data')
        if (data) {
          alert(`data: ${data.getGDBS}`)
          return (
            <div className='gdbListContainer'>
              <div className='GDBtotal'>
                Number of GDBS - { data.getGDBS.length }
              </div>
              <div className='GDBList'>
                { data.getGDBS.map(g => <GDB key={g.gdbno} gdb={g} />)}
              </div>
            </div>
          )
        }
      }
    }}
  </Query>
)

export default Gdbs
