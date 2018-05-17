import dotenv from 'dotenv'
import express from 'express'
import express_graphql from 'express-graphql'
import { buildSchema } from 'graphql'
import cors from 'cors'

import schema from './schemas/schema'

const app = express()
app.use(cors())

dotenv.config()

app.use('/graphql', express_graphql({
  schema,
  rootValue: root,
  graphiql: true
}))

app.listen(process.env.GRAPHQL_PORT, () => console.log(`Server listening on ${process.env.GRAPHQL_PORT}/graphql`))
