import dotenv from 'dotenv'
import express from 'express'
import express_graphql from 'express-graphql'
import mongoose from 'mongoose'

import schema from './schemas/schema'
import GDB from './models/GDB'

const app = express()

dotenv.config()

// Connect to database
mongoose.connect(`${process.env.DATABASE}`, () => console.log(`logged on to the ${process.env.DB_NAME} database.`))
// Get mongoose to use the global promise library
mongoose.Promise = global.Promise

const db = mongoose.connection
// Bind connection to the error event to get notification of connection errors
db.on('error', console.log.bind(console, 'MongoDB connection error: '))

const gdb = [
  {
    gdbno: 'mDB01',
    createdBy: 'Nuno Santos',
    customer: 'Customer mDB',
    active: true,
    status: {
      statusType: 'OPEN',
      statusDesc: 'description of status'
    }
  },
  {
    gdbno: 'mDB02',
    createdBy: 'User02',
    customer: 'CAIXACS',
    active: true,
    status: [
      {
        statusType: 'OPEN',
        statusDesc: 'description of status',
        statusDate: new Date(2018, 2, 13)
      },
      {
        statusType: 'CLOSE',
        statusDesc: 'all good.'
      }
    ]
  }
]

const res = new Promise((resolve, reject) => {
  GDB.insertMany(gdb, (err, gdb) => {
    if (err) {
      reject(err)
    }
    resolve(gdb)
  })
}).then((gdb) => console.log(`Documents Added: ${gdb}`))

app.use('/graphql', express_graphql({
  schema,
  rootValue: root,
  graphiql: true
}))

app.listen(process.env.GRAPHQL_PORT, () => console.log(`Server listening on ${process.env.GRAPHQL_PORT}/graphql`))
