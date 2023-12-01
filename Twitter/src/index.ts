import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
const app = express()
const port = 3000
app.use(express.json())

databaseService.connect()
app.use('/users', usersRouter)
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
