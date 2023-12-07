import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middewares'
import morgan from 'morgan'
databaseService.connect()
const app = express()
const port = 3000
app.use(morgan('dev'))
app.use(express.json())
app.use('/users', usersRouter)
app.use(defaultErrorHandler)
app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
