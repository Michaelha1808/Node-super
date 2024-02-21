import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { TweetType } from '~/constants/enums'
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
  const result = await tweetsService.createTweet(user_id, req.body)
  res.json({
    message: 'Tweets created successfully',
    result
  })
}
export const getTweetController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await tweetsService.increaseView(req.params.tweet_id, req.decoded_authorization?.user_id)
  const tweet = {
    ...req.tweet,
    guest_views: result.guest_views,
    user_views: result.user_views
  }
  res.json({
    message: 'Get Tweet successfully',
    result: req.tweet
  })
}
export const getTweetChildrenController = async (req: Request, res: Response, next: NextFunction) => {
  const tweetType = Number(req.query.tweet_type as string) as TweetType
  const limit = Number(req.query.limit as string)
  const page = Number(req.query.page as string)
  const { total, tweets } = await tweetsService.getTweetChildren({
    tweet_id: req.params.tweet_id,
    tweet_type: Number(req.query.tweet_type as string) as TweetType,
    limit: Number(req.query.limit as string),
    page: Number(req.query.page as string)
  })
  res.json({
    message: 'Get Tweet children successfully',
    result: {
      tweets,
      tweetType,
      limit,
      page,
      total_page: Math.ceil(total / limit)
    }
  })
}
