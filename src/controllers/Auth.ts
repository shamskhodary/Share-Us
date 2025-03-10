
import { Request, Response, NextFunction } from 'express'
import * as bcrypt from 'bcrypt'
import generateToken from '../helpers/generateToken'
import passport from '../passport/LocalSignIn'
import { User } from '../db'
import validateSignup from '../validation/signup'
import CustomError from '../helpers/CustomError'
import { IUserRequest } from '../interfaces/IUserRequest'

export default class Auth {
  public static async signIn (req:Request, res:Response, next:NextFunction) {
    passport.authenticate('local', async (err:any, user:any, info:any) => {
      if (err) { return next(err) }
      if (!user) {
        const { message } = info
        return res.status(422).json({ success: false, message })
      }
      const { id, username } = user
      const token = await generateToken({ id, username })
      user.password = ''
      return res.status(200)
        .json({
          success: true,
          message: 'authentication succeeded',
          user,
          token
        })
    })(req, res, next)
  }

  public static async signUp (req:Request, res: Response) {
    await validateSignup(req.body)
    const userExist = await User.findOne({
      where: {
        username: req.body.username
      }
    })
    if (userExist) {
      throw new CustomError('username already exists', 400)
    }

    const emailExist = await User.findOne({
      where: {
        email: req.body.email
      }
    })

    if (emailExist) {
      throw new CustomError('email already exists', 400)
    }

    const hashed = await bcrypt.hash(req.body.password, 10)

    const userData = await User.create({ ...req.body, password: hashed })

    const token = await generateToken({ id: userData.id, username: userData.username })
    userData.password = ''
    res.json({ data: userData, token })
  }

  public static async verifyMe (req:IUserRequest, res:Response) {
    const user = req.user
    const userData = await User.findOne({ where: { id: user?.id } })
    if (userData?.password) {
      userData.password = ''
    }
    res.json({ data: userData })
  }

  public static async googleRegister (req: Request, res: Response) {
    const { email, username, refreshToken, oauthExpireIn, oauthAccessToken, profileImg } = req.body
    const googleAccount = await User.findOne({
      where: {
        email
      }
    })

    if (!googleAccount) {
      const newAccount = await User.create({
        email,
        username,
        refreshToken,
        oauthExpireIn,
        oauthAccessToken,
        profileImg
      })
      const token = await generateToken({ id: newAccount.id, username: newAccount.username })
      res.json({ data: newAccount, token })
    } else {
      const update = await User.update({
        refreshToken,
        oauthExpireIn,
        oauthAccessToken
      },
      {
        where: {
          email
        },
        returning: true
      })
      const token = await generateToken({ id: update[1][0].getDataValue('id'), username: update[1][0].getDataValue('username') })
      res.json({ data: update[1][0], token })
    }
  }
}
