import { MongoClient, ServerApiVersion } from 'mongodb'
import { config } from 'dotenv'
config()
const ENV = process.env
const uri = `mongodb+srv://${ENV.DB_USERNAME}:${ENV.DB_PASSWORD}@cluster0.tuwsifh.mongodb.net/?retryWrites=true&w=majority`

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

class DatabaseService {
  private client: MongoClient
  constructor() {
    this.client = new MongoClient(uri)
  }
  async connect() {
    try {
      // Send a ping to confirm a successful connection
      await this.client.db('admin').command({ ping: 1 })
      console.log('You successfully connected to MongoDB!')
    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close()
    }
  }
}
//TODO creat object from DatabaseService
const databaseService = new DatabaseService()
export default databaseService
