import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const Q = gql`
query GDBS {
  GDBS {
    gdbno
  }
}
`

const Gdbs = () => (
  <Query query={Q}>
  {({ data, loading }) => {
    if (loading) {
      console.log('LOADING')
      return (<h1>LOADING</h1>)
    } else {
      if (data) {
        console.log('GDBS')

        return (
          <div>
            GDBS - { data.GDBS.length }
          </div>
        )
      }
    }
  }}
  </Query>
)

export default Gdbs
