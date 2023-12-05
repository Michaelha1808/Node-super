import { Request, Response, NextFunction } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { RegisterReqBody } from '~/models/requests/User.requests'
import User from '~/models/schemas/User.schema'
import databaseService from '~/services/database.services'
import usersService from '~/services/user.services'

export const loginController = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  if (email === 'haminhchi1808@gmail.com' && password === 123) {
    return res.status(200).json({
      message: 'Login success'
    })
  }
  return res.status(400).json({
    message: 'Login failed'
  })
}

export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  // throw new Error('loi roi')
  const result = await usersService.register(req.body)
  return res.status(200).json({
    message: 'Register success',
    result
  })
}
