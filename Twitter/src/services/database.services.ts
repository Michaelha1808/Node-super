import { Collection, Db, MongoClient } from 'mongodb'
import { config } from 'dotenv'
import User from '~/models/schemas/User.schema'
import RefreshToken from '~/models/schemas/RefreshToken.shema'
config()
const ENV = process.env
const uri = `mongodb+srv://${ENV.DB_USERNAME}:${ENV.DB_PASSWORD}@cluster0.tuwsifh.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class DatabaseService {
  private client: MongoClient
  private db: Db
  constructor() {
    this.client = new MongoClient(uri)
    this.db = this.client.db(`${ENV.DB_NAME}`)
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

  get users(): Collection<User> {
    return this.db.collection(`${ENV.DB_USERS_COLLECTION}` as string)
    //TODO bare string return this.db.collection(ENV.DB_USERS_COLLECTION as string)
  }
  get refreshToken(): Collection<RefreshToken> {
    return this.db.collection(`${ENV.DB_REFRESH_TOKENS_COLLECTION}` as string)
  }
}
//TODO creat object from DatabaseService
const databaseService = new DatabaseService()
export default databaseService
