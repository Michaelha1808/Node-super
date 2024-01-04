import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { USERS_MESSAGES } from '~/constants/messages'
import { TweetRequestBody } from '~/models/requests/Tweets.requests'
import { TokenPayload } from '~/models/requests/User.requests'
import tweetsService from '~/services/tweets.services'

export const createTweetController = async (
  req: Request<ParamsDictionary, any, TweetRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const { user_id } = req.decoded_authorization as TokenPayload
  const result = await tweetsService.createTweets(user_id, req.body)
  res.json({
    message: 'Tweets created successfully',
    result
  })
}
export const getTweetController = async (req: Request, res: Response, next: NextFunction) => {
  res.json({
    message: 'Get Tweet successfully',
    result: 'ok'
  })
}
