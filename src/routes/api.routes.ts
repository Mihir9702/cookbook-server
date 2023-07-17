import { Router, Request, Response } from 'express'
const router = Router()
import User from '../models/User.model'

/******************************************* 
            cookbook.com/api                  
*******************************************/

// Api Routes are handled here
import catalogRoutes from './catalog.routes'
router.use('/catalog', catalogRoutes)

import userRoutes from './user.routes'
router.use('/user', userRoutes)

import cookbookRoutes from './cookbook.routes'
router.use('/cookbook', cookbookRoutes)

// * Update
router.post('/:username/update', (req: Request, res: Response) => {
  User.findOneAndUpdate(
    { username: req.params.username },
    {
      name: req.body.name,
      username: req.body.username,
    }
  )
    .then(r => res.status(200).json(r))
    .catch(e => res.status(500).json(e))
})

// * Individual User
router.get('/:username', (req: Request, res: Response) => {
  User.findOne({ username: req.params.username })
    .then(u => res.status(200).json(u))
    .catch(e => res.status(503).json({ error: e }))
})

export default router
