import { Router } from 'express'
import { loginController, logoutController, registerController } from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  loginValidator,
  refrehTokenValidator,
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
usersRouter.post('/logout', accessTokenValidator, refrehTokenValidator, wrapRequestHandler(logoutController))

export default usersRouter
