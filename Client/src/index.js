import React from 'react'
import { render } from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost'
import gql from 'graphql-tag'

import App from './components/App'

const client = new ApolloClient({
  link: new HttpLink({uri: 'http://localhost:3000/graphql'}),
  cache: new InMemoryCache()
})

/* client.query({
  query: gql`
  {
    GDBS {
      gdbno
    }
  }
  `
})
.then(result => console.log(result)) */

const AppWithProvider = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)

render(<AppWithProvider />, document.getElementById('app'))
