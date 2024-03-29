import { Collection, Db, MongoClient } from 'mongodb'

import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.shema'
import Followers from '~/models/schemas/Follower.schema'
import VideoStatus from '~/models/schemas/VideoStatus.schema'
import Tweet from '~/models/schemas/Tweet.schema'
import Hashtag from '~/models/schemas/Hashtag.schema'
import Bookmark from '~/models/schemas/Bookmark.shema'
import Like from '~/models/schemas/Like.schema'
import Conversation from '~/models/schemas/Conversations.schema'
import { envConfig } from '~/constants/config'

const uri = `mongodb+srv://${envConfig.dbUsername}:${envConfig.dbPassword}@cluster0.tuwsifh.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(`${envConfig.dbName}`)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.db.command({ ping: 1 })
      console.log('You successfully connected to MongoDB!')
    } catch (error) {
      // Ensures that the client will close when you finish/error
      // await this.client.close()
      console.log('Error', error)
      throw error
    }
  }

  async indexUsers() {
    const exist = await this.users.indexExists(['email_1_password_1', 'email_1', 'username_1'])
    if (!exist) {
      this.users.createIndex({ email: 1, password: 1 })
      this.users.createIndex({ email: 1 }, { unique: true })
      this.users.createIndex({ username: 1 }, { unique: true })
    }
  }
  async indexRefreshTokens() {
    const exist = await this.refreshToken.indexExists(['exp_1', 'token_1'])
    if (!exist) {
      this.refreshToken.createIndex({ token: 1 })
      this.refreshToken.createIndex(
        { exp: 1 },
        {
          expireAfterSeconds: 0
        }
      )
    }
  }
  async indexVideoStatus() {
    const exist = await this.videoStatus.indexExists(['name_1'])
    if (!exist) {
      this.videoStatus.createIndex({ name: 1 })
    }
  }
  async indexFollowers() {
    const exist = await this.videoStatus.indexExists(['user_id_1_followed_user_id_1'])
    if (!exist) {
      this.followers.createIndex({ user_id: 1, followed_user_id: 1 })
    }
  }
  async indexTweets() {
    const exists = await this.tweets.indexExists(['content_text'])
    if (!exists) {
      this.tweets.createIndex({ content: 'text' }, { default_language: 'none' })
    }
  }
  get tweets(): Collection<Tweet> {
    return this.db.collection(`${envConfig.dbTweetsCollection}` as string)
    //TODO bare string return this.db.collection(ENV.DB_USERS_COLLECTION as string)
  }
  get users(): Collection<User> {
    return this.db.collection(`${envConfig.dbUsersCollection}` as string)
    //TODO bare string return this.db.collection(ENV.DB_USERS_COLLECTION as string)
  }
  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection(`${envConfig.dbRefreshTokensCollection}` as string)
  }
  get followers(): Collection<Followers> {
    return this.db.collection(`${envConfig.dbFollowersCollection}` as string)
  }
  get videoStatus(): Collection<VideoStatus> {
    return this.db.collection(`${envConfig.dbVideoStatusCollection}` as string)
  }
  get hashtags(): Collection<Hashtag> {
    return this.db.collection(`${envConfig.dbHashtagsCollection}` as string)
  }
  get bookmarks(): Collection<Bookmark> {
    return this.db.collection(`${envConfig.dbBookmarksCollection}` as string)
  }
  get likes(): Collection<Like> {
    return this.db.collection(`${envConfig.dbLikesCollection}` as string)
  }
  get conversations(): Collection<Conversation> {
    return this.db.collection(envConfig.dbConversationCollection as string)
  }
}
//TODO creat object from DatabaseService
const databaseService = new DatabaseService()
export default databaseService
