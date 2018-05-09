import dotenv from 'dotenv'
import express from 'express'
import express_graphql from 'express-graphql'
import { buildSchema } from 'graphql'
import mongoose from 'mongoose'

import schema from './schemas/schema'
import gdbData from './data/mock'

const app = express()

dotenv.config()

// Connect to database
mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, () => console.log(`logged on to the ${process.env.DB_NAME} database.`))
// Get mongoose to use the global promise library
mongoose.Promise = global.Promise

const db = mongoose.connection
// Bind connection to the error event to get notification of connection errors
db.on('error', console.log.bind(console, 'MongoDB connection error: '))

app.use('/graphql', express_graphql({
  schema,
  rootValue: root,
  graphiql: true
}))

app.listen(process.env.GRAPHQL_PORT, () => console.log(`Server listening on ${process.env.GRAPHQL_PORT}/graphql`))
