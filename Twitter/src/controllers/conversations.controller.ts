import { NextFunction, Request, Response } from 'express'
import { GetConversationParams } from '~/models/requests/Conversation.requests'
import conversationService from '~/services/conversations.services'

export const getConversationsController = async (
  req: Request<GetConversationParams>,
  res: Response,
  next: NextFunction
) => {
  const { receiver_id } = req.params
  const limit = Number(req.query.limit)
  const page = Number(req.query.page)

  const sender_id = req.decoded_authorization?.user_id as string
  const result = await conversationService.getConversations({ receiver_id, sender_id, limit, page })
  return res.json({
    result: {
      limit,
      page,
      total_page: Math.ceil(result.total / limit),
      conversations: result.conversations
    },
    message: 'Get conversation successfully'
  })
}
