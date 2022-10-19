
import generateToken from '../helpers/generateToken'
import passport from '../auth/LocalSignIn'
import { Request, Response, NextFunction } from 'express'

const signIn = async (req:Request, res:Response, next:NextFunction) => {
  passport.authenticate('local', async (err:any, user:any, info:any) => {
    if (err) { return next(err) }
    if (!user) {
      const { message } = info
      return res.status(422).json({ success: false, message })
    }
    const { id, email, username, profileImg } = user
    const token = await generateToken({ id, username })
    return res.status(200)
      .json({
        success: true,
        message: 'authentication succeeded',
        user: { id, username, email, profileImg },
        token
      })
  })(req, res, next)
}
export default signIn
