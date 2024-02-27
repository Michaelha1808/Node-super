import { ObjectId } from 'mongodb'
import databaseService from './database.services'

class ConversationService {
  async getConversations({
    sender_id,
    receiver_id,
    limit,
    page
  }: {
    sender_id: string
    receiver_id: string
    limit: number
    page: number
  }) {
    const match = {
      $or: [
        {
          sender_id: new ObjectId(sender_id),
          receiver_id: new ObjectId(receiver_id)
        },
        {
          sender_id: new ObjectId(receiver_id),
          receiver_id: new ObjectId(sender_id)
        }
      ]
    }
    const [conversations, total] = await Promise.all([
      databaseService.conversations
        .find(match)
        .sort({ created_at: -1 })
        .skip(limit * (page - 1))
        .limit(limit)
        .toArray(),
      databaseService.conversations.countDocuments(match)
    ])
    // const conversations = await databaseService.conversations
    //   .find(match)
    //   .skip(limit * (page - 1))
    //   .limit(limit)
    //   .toArray()
    // const total = await databaseService.conversations.countDocuments(match)
    // console.log(conversations, total)
    return {
      conversations,
      total
    }
  }
}
const conversationService = new ConversationService()
export default conversationService
