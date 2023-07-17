// Main framework of Nodejs to create api
import express, { Express } from 'express'

// Environment variables
import 'dotenv/config'

import logger from 'morgan'

import cookieParser from 'cookie-parser'

// Cross Origin Resource Sharing | Only allow server to accept form requests from the same domain
import cors from 'cors'

// * Middleware configuration
// ! Error CORS
const app = (app: Express) => {
  app.set('trust proxy', 1)

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))

  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || process.env.LOCAL,
    })
  )

  app.use(logger('dev'))
  app.use(cookieParser())
}

export default app
