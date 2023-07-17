import 'dotenv/config'
import { Request, Response, Router } from 'express'
const router = Router()

// Models
import User from '../models/User.model'

// Middleware
import signupHandler from '../middleware/signupHandler'
import auth from '../middleware/jwt.middleware'

// Encryption
import { genSaltSync, compareSync, hashSync } from 'bcryptjs'

// JWT
import jwt from 'jsonwebtoken'

/***********************************************
             cookbook.com/api/user             
 ***********************************************/

// * Signup
router.post('/signup', signupHandler, (req: Request, res: Response) => {
  const SALTROUNDS = 10
  const salt = genSaltSync(SALTROUNDS)
  const hash = hashSync(req.body.password, salt)
  req.body.password = hash

  User.create(req.body)
    .then(user => {
      const { _id, name, username } = user

      // Token payload
      const payload = { _id, name, username }
      const TOKEN = process.env.TOKEN_SECRET

      if (TOKEN) {
        const authToken = jwt.sign(payload, TOKEN, {
          algorithm: 'HS256',
          expiresIn: '48h',
        })
        res.status(201).json({ ...payload, authToken: authToken })
      }
    })
    .catch(() => res.status(400).json({ errorMessage: 'User Creation Error' }))
})

// * Login
router.post('/login', (req: Request, res: Response) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      // Couldn't find an account
      if (!user)
        return res.status(401).json({ errorMessage: 'Account not found' })

      // Comparing passwords
      const checkPass = compareSync(req.body.password, user.password)
      if (checkPass) {
        const { _id, name, username } = user

        // Token payload
        const payload = { _id, name, username }
        const TOKEN = process.env.TOKEN_SECRET

        if (TOKEN) {
          const authToken = jwt.sign(payload, TOKEN, {
            algorithm: 'HS256',
            expiresIn: '48h',
          })
          res.status(201).json({ ...payload, authToken: authToken })
        }
      } else {
        res
          .status(401)
          .json({ errorMessage: 'Username or Password is incorrect' })
      }
    })
    .catch(() =>
      res.status(504).json({ errorMessage: 'Internal Server Error' })
    )
})

// * Delete
router.get('/:id/delete', auth, (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(deletedUser => {
      if (deletedUser) {
        res
          .status(200)
          .json({ status: `Successfully deleted ${deletedUser.username}` })
      }
    })
    .catch(() =>
      res.status(500).json({ errorMessage: 'Unable to delete account' })
    )
})

export default router
