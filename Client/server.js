import express from 'express'
import dotenv from 'dotenv'

const app = express()

dotenv.config()

app.listen(process.env.CLIENT_PORT, () => console.log(`Server listening @ port ${process.env.CLIENT_PORT}`))
