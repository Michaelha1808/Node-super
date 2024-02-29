import { Router } from 'express'
import {
  changePasswordController,
  followController,
  forgotPasswordController,
  getMeController,
  getProfileController,
  loginController,
  logoutController,
  oauthController,
  refreshTokenController,
  registerController,
  resendVerifyEmailController,
  resetPasswordController,
  unfollowController,
  updateMecontroller,
  verifyEmailController,
  verifyForgotPasswordController
} from '~/controllers/users.controllers'
import { filterMiddleware } from '~/middlewares/common.middlewares'
import {
  accessTokenValidator,
  changePasswordValidator,
  emailVerifyTokenValidator,
  followValidator,
  forgotPasswordValidator,
  loginValidator,
  refreshTokenValidator,
  registerValidator,
  resetPasswordValidator,
  unfollowValidator,
  updateMeValidator,
  verifiedUserValidator,
  verifyForgotPasswordTokenValidator
} from '~/middlewares/users.middlewares'
import { UpdateMeReqBody } from '~/models/requests/User.requests'
import { wrapRequestHandler } from '~/utils/handlers'

const usersRouter = Router()

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - users
 *     summary: Đăng nhập
 *     description: Đăng nhập vào hệ thống
 *     operationId: login
 *     requestBody:
 *       description: Thông tin đăng nhập
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/LoginBody"
 *     responses:
 *       "200":
 *         description: Đăng nhập thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login success
 *                 result:
 *                   $ref: "#/components/schemas/SuccessAuthentication"
 *       "400":
 *         description: Invalid input
 *       "422":
 *         description: Validation exception
 *     security:
 *       - petstore_auth:
 *           - write:pets
 *           - read:pets
 */

usersRouter.post('/login', loginValidator, wrapRequestHandler(loginController))

/**
 * Description. login a new access
 * Path: /oauth/google
 * Method: GET
 * Query Parameters: {code: string}
 */

usersRouter.get('/oauth/google', wrapRequestHandler(oauthController))

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
 * Body:{ refresh_token:string}
 */
usersRouter.post('/logout', accessTokenValidator, refreshTokenValidator, wrapRequestHandler(logoutController))

/**
 * Description. Refresh Token
 * Path: /refresh-token
 * Method: Post
 * Body:{ refresh_token:string}
 */
usersRouter.post('/refresh-token', refreshTokenValidator, wrapRequestHandler(refreshTokenController))

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

/**
 * Description. Submit email to rest password, send email to user
 * Path: /forgot-password
 * Method: Post
 * Body:{ email: string  }
 */
usersRouter.post('/forgot-password', forgotPasswordValidator, wrapRequestHandler(forgotPasswordController))

/**
 * Description. Verify link in email to rest password
 * Path: /verify-forgot-password
 * Method: Post
 * Body:{ forgot_password_token: string  }
 */
usersRouter.post(
  '/verify-forgot-password',
  verifyForgotPasswordTokenValidator,
  wrapRequestHandler(verifyForgotPasswordController)
)

/**
 * Description. Reset password
 * Path: /reset-password
 * Method: Post
 * Body:{ forgot_password_token: string  }
 */
usersRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))

/**
 * Description. Reset password
 * Path: /reset-password
 * Method: Post
 * Body:{ forgot_password_token: string  }
 */
usersRouter.post('/reset-password', resetPasswordValidator, wrapRequestHandler(resetPasswordController))

/**
 * Description. Get my profile
 * Path: /me
 * Method: Get
 * Header:{ Authorization : Bearer <access_token> }
 */
usersRouter.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))

/**
 * Description. Update my profile
 * Path: /me
 * Method: Patch
 * Header:{ Authorization : Bearer <access_token> }
 * Body: UserSchema
 */
usersRouter.patch(
  '/me',
  accessTokenValidator,
  verifiedUserValidator,
  updateMeValidator,
  filterMiddleware<UpdateMeReqBody>([
    'name',
    'date_of_birth',
    'bio',
    'location',
    'website',
    'username',
    'avatar',
    'cover_photo'
  ]),
  wrapRequestHandler(updateMecontroller)
)

/**
 * Description. Get user infor
 * Path: /:username
 * Method: Get
 */
usersRouter.get('/:username', wrapRequestHandler(getProfileController))

/**
 * Description. Follow some one
 * Path: /follow
 * Method: POST
 * Header:{ Authorization : Bearer <access_token> }
 * Body:{followed_user_id:string}
 */
usersRouter.post(
  '/follow',
  accessTokenValidator,
  verifiedUserValidator,
  followValidator,
  wrapRequestHandler(followController)
)

/**
 * Description. unFollow some one
 * Path: /follow
 * Method: Delete
 * Header:{ Authorization : Bearer <access_token> }
 * Body:{followed_user_id:string}
 */
usersRouter.delete(
  '/follow/:user_id',
  accessTokenValidator,
  verifiedUserValidator,
  unfollowValidator,
  wrapRequestHandler(unfollowController)
)

/**
 * Description. change password
 * Path: /change-password
 * Method: PUT
 * Header:{ Authorization : Bearer <access_token> }
 * Body:{old_password:string,password:string, confirm_password:string}
 */
usersRouter.put(
  '/change-password',
  accessTokenValidator,
  verifiedUserValidator,
  changePasswordValidator,
  wrapRequestHandler(changePasswordController)
)

export default usersRouter
