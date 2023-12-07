import { Router } from 'express'
import {
  loginController,
  logoutController,
  registerController,
  resendVerifyEmailController,
  verifyEmailController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  emailVerifyTokenValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator
} from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()
/**
 * Description. login a new access
 * Path: /login
 * Method: Post
 * Body:{ email: string, password: string}
 */

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Description. Register a new user
 * Path: /register
 * Method: Post
 * Body:{name: string, email: string, password: string, confirm_password:string, date_of_birth:ISO8601}
 */
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

/**
 * Description. logout a user
 * Path: /logout
 * Header:{Authorization: Bearer <access token>}
 * Method: Post
 * Body:{ refesh_token:string}
 */
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Description. Verify email whe user click on the link email
 * Path: /verify-email
 * Method: Post
 * Body:{ email_verify_token : string}
 */
usersRouter.post('/verify-email', emailVerifyTokenValidator, wrapRequestHandler(verifyEmailController))

/**
 * Description. resend email whe user click on the link email
 * Path: /resend-verify-email
 * Header:{Authorization: Bearer <access token>}
 * Method: Post
 * Body:{}
 */
usersRouter.post('/resend-verify-email', accessTokenValidator, wrapRequestHandler(resendVerifyEmailController))

export default usersRouter
