import { JwtPayload } from 'jsonwebtoken'
import { TokenType, UserVerifyStatus } from '~/constants/enums'
import { ParamsDictionary } from 'express-serve-static-core'

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginBody:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: haminhchi18082002@gmail.com
 *         password:
 *           type: string
 *           example: Minhchi123@
 *     SuccessAuthentication:
 *       type: object
 *       properties:
 *         result:
 *           type: object
 *           properties:
 *             access_token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjVkODQ3YjJjZjYyNzBmYzA2NmRhMzdmIiwidG9rZW5fdHlwZSI6MCwidmVyaWZ5IjoxLCJpYXQiOjE3MDkxMDY1MzgsImV4cCI6MTcwOTEwNzQzOH0.OQRy1t3SCiHwpUe_BAA4wOHgphTFs58_OAC2BmvpsK0
 *             refresh_token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjVkODQ3YjJjZjYyNzBmYzA2NmRhMzdmIiwidG9rZW5fdHlwZSI6MSwidmVyaWZ5IjoxLCJpYXQiOjE3MDkxMDY1MzgsImV4cCI6MTcxNzc0NjUzOH0.FHiEkBK_N2hEwo-eqZm5wJInNdp5nwDhu6D64bQPeUc
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "65d847b2cf6270fc066da37f"
 *           format: MongoId
 *         name:
 *           type: string
 *           example: "Chi Ha Minh"
 *         email:
 *           type: string
 *           format: email
 *           example: "haminhchi18082002@gmail.com"
 *         date_of_birth:
 *           type: string
 *           format: ISO8601
 *           example: "2023-06-06T08:26:33.781Z"
 *         created_at:
 *           type: string
 *           format: ISO8601
 *           example: "2024-02-23T07:22:26.454Z"
 *         updated_at:
 *           type: string
 *           format: ISO8601
 *           example: "2024-02-23T07:23:26.576Z"
 *         verify:
 *           $ref: "#/components/schemas/UserVerifyStatus"
 *         twitter_circle:
 *           type: array
 *           items:
 *             type: string
 *             format: MongoId
 *           example: ["65d847b2cf6270fc066da37f", "65d847b2cf6254fc066da37f"]
 *         bio:
 *           type: string
 *           example: ""
 *         location:
 *           type: string
 *           example: ""
 *         website:
 *           type: string
 *           format: uri
 *           example: ""
 *         username:
 *           type: string
 *           example: "user65d847b2cf6270fc066da37f"
 *         avatar:
 *           type: string
 *           format: uri
 *           example: ""
 *         cover_photo:
 *           type: string
 *           format: uri
 *           example: ""
 *     UserVerifyStatus:
 *       type: number
 *       enum:
 *         - Unverified
 *         - Verified
 *         - Banned
 *       example: 1
 */

export interface UpdateMeReqBody {
  name?: string
  date_of_birth?: string
  bio?: string
  location?: string
  website?: string
  username?: string
  avatar?: string
  cover_photo?: string
}
export interface FollowReqBody {
  followed_user_id: string
}
export interface UnfollowReqParams extends ParamsDictionary {
  user_id: string
}

export interface LoginReqBody {
  email: string
  password: string
}
export interface ForgotPasswordReqBody {
  email: string
}
export interface ChangePasswordReqBody {
  old_password: string
  password: string
  confirm_password: string
}
export interface VerifyForgotPasswordReqBody {
  forgot_password_token: string
}
export interface ResetPasswordReqBody {
  password: string
  confirm_password: string
  forgot_password_token: string
}
export interface VerifyEmailReqBody {
  email_verify_token: string
}

export interface GetProfileReqParams extends ParamsDictionary {
  username: string
}
export interface RegisterReqBody {
  name: string
  email: string
  password: string
  confirm_password: string
  date_of_birth: string
}

export interface LogoutReqBody {
  refresh_token: string
}
export interface RefreshTokenReqBody {
  refresh_token: string
}

export interface TokenPayload extends JwtPayload {
  user_id: string
  token_type: TokenType
  verify: UserVerifyStatus
  exp: number
  iat: number
}
