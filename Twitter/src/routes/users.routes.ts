import { Router } from 'express'
import { loginController, registerController } from '~/controllers/users.controllers'
import { loginValidator, registerValidator } from '~/middlewares/users.middlewares'
import { validate } from '~/utils/validation'

const usersRouter = Router()
/**
 * Description. Register a new user
 * Path: /register
 * Method: Post
 * Body:{name: string, email: string, password: string, confirm_password:string, date_of_birth:ISO8601}
 */

usersRouter.post('/login', loginValidator, loginController)
usersRouter.post(
  '/register',
  async (req, res, next) => {
    console.log('request handler 1')
    // next(new Error('error b oi'))
    Promise.reject(new Error('error b oi')).catch(next)
    // try {
    //   throw new Error('loi roi b oi')
    // } catch (error) {
    //   next(error)
    // }
  },
  (req, res, next) => {
    console.log('request handler 2')
    next()
  },
  (req, res, next) => {
    console.log('request handler 3')
    res.json({ message: 'Register success !' })
  },
  (err, req, res, next) => {
    console.log('loi la', err.message)
    res.status(400).json({ error: err.message })
  }
)

export default usersRouter
