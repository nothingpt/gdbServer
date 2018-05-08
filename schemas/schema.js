
import { makeExecutableSchema } from 'graphql-tools'
import resolvers from '../resolvers/resolver'

const typeDefs = `
  type Query {
    GDB(gdbno: String): GDB,
    GDBS(createdBy: String): [ GDB ],
    getStatus(gdbno: String!): [Status]
  },
  type Mutation {
    createGDB(gdbno: String!, creationDate: String!, createdBy: String!, customer: String!, statusType: String, statusDate: String, statusDesc: String): GDB,
    updateStatus(gdbno: String!, statusType: String!, statusDate: String, statusDesc: String): GDB,
    updateGDB(gdbno: String!, creationDate: String, createdBy: String, customer: String, active: Boolean): GDB
  },
  type GDB {
    gdbno: String! @unique, 
    creationDate: String,
    createdBy: String,
    customer: String!,
    active: Boolean,
    status: [Status]
  },
  type Status {
    statusType: String,
    statusDate: String,
    statusDesc: String
  }
`

const schema = makeExecutableSchema({ typeDefs, resolvers })

export default schema
