import express from 'express'
import usersRouter from './routes/users.routes'
import databaseService from './services/database.services'
import { defaultErrorHandler } from './middlewares/error.middewares'
import morgan from 'morgan'
import mediasRouter from './routes/medias.routes'
import { initFolder } from './utils/file'
import { config } from 'dotenv'
import { UPLOAD_VIDEO_DIR } from './constants/dir'
import staticRouter from './routes/static.routes'
import cors from 'cors'
import { MongoClient } from 'mongodb'
import tweetsRouter from './routes/tweets.routes'
import bookmarksRouter from './routes/bookmarks.routes'
import likesRouter from './routes/likes.routes'
import searchRouter from './routes/search.routes'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { isObject } from 'lodash'

// import '~/utils/s3'

config()
databaseService.connect().then(() => {
  databaseService.indexUsers()
  databaseService.indexRefreshTokens()
  databaseService.indexVideoStatus()
  databaseService.indexFollowers()
  databaseService.indexTweets()
})
const app = express()
const httpServer = createServer(app)
app.use(cors())
const port = process.env.PORT || 4000
// check folder uploads exist
initFolder()

app.use(morgan('dev'))
app.use(express.json())
app.use('/users', usersRouter)
app.use('/medias', mediasRouter)
app.use('/static', staticRouter)
app.use('/tweets', tweetsRouter)
app.use('/bookmarks', bookmarksRouter)
app.use('/likes', likesRouter)
app.use('/search', searchRouter)

app.use('/static/video', express.static(UPLOAD_VIDEO_DIR))
app.use(defaultErrorHandler)

const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:3000'
  }
})
const users: {
  [key: string]: {
    socket_id: string
  }
} = {}
io.on('connection', (socket) => {
  console.log(`User ${socket.id}  connected`)
  const user_id = socket.handshake.auth._id
  users[user_id] = {
    socket_id: socket.id
  }
  console.log(users)
  socket.on('private message', (data) => {
    const receiver_socket_id = users[data.to]?.socket_id
    if (!receiver_socket_id) {
      return
    }
    socket.to(receiver_socket_id).emit('receive private message', {
      content: data.content,
      from: user_id
    })
  })
  socket.on('disconnect', () => {
    delete users[user_id]
    console.log(`User ${socket.id}  disconnected`)
    console.log(users)
  })
})

httpServer.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

// const mgclient = new MongoClient(
//   `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.tuwsifh.mongodb.net/?retryWrites=true&w=majority`
// )
// const db = mgclient.db('earth')

// const users = db.collection('users')
// const userData = []

// function getRandomNumber() {
//   return Math.floor(Math.random() * 100) + 1
// }
// for (let i = 0; i < 1000; i++) {
//   userData.push({
//     name: 'user' + (i + 1),
//     age: getRandomNumber(),
//     sex: i % 2 == 0 ? 'male' : 'female',
//     address: ''
//   })
// }
// users.insertMany(userData)
