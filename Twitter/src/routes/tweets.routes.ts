import { Router } from 'express'
import { createTweetController, getTweetController } from '~/controllers/tweets.controller'
import { createTweetValidator, tweetIdValidator } from '~/middlewares/tweets.middlewares'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const tweetsRouter = Router()

/**
 * Description. Create Tweet
 * Path: /
 * Method: Post
 * Body:{ TweetReqBody}
 * Headers: { Authorization: Bearer <access_token>}
 */
tweetsRouter.post(
  '/',
  accessTokenValidator,
  verifiedUserValidator,
  createTweetValidator,
  wrapRequestHandler(createTweetController)
)

/**
 * Description. Get Tweet detail
 * Path: /:tweet_id
 * Method: GET
 * Headers: { Authorization: Bearer <access_token>}
 */
tweetsRouter.get('/:tweet_id', tweetIdValidator, wrapRequestHandler(getTweetController))

export default tweetsRouter
