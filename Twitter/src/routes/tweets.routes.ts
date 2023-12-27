import { Router } from 'express'
import { createTweetController } from '~/controllers/tweets.controller'
import { accessTokenValidator, verifiedUserValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'
const tweetsRouter = Router()

/**
 * Description. Create Tweet
 * Path: /
 * Method: Post
 * Body:{ TweetReqBody}
 */
tweetsRouter.post('/', accessTokenValidator, verifiedUserValidator, wrapRequestHandler(createTweetController))

export default tweetsRouter
