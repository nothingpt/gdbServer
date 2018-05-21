import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

const app = express()

app.use(cors())

dotenv.config()

app.listen(process.env.CLIENT_PORT, () => console.log(`Server listening @ port ${process.env.CLIENT_PORT}`))
