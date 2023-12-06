import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()
/**
 * Description. Register a new user
 * Path: /register
 * Method: Post
 * Body:{name: string, email: string, password: string, confirm_password:string, date_of_birth:ISO8601}
 */

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))
usersRouter.post('/register', registerValidator, wrapRequestHandler(registerController))

export default usersRouter
