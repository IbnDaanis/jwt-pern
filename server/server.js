import express from 'express'
import cors from 'cors'
import { pool } from './database/database.js'
import jwtAuth from './routes/jwtAuth.js'

const app = express()

app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 5000

app.use('/auth', jwtAuth)

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`)
})
