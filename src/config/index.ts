import 'dotenv/config'
import express, { Express } from 'express'
import cors from 'cors'
import logger from 'morgan'
import cookieParser from 'cookie-parser'

export default (app: Express) => {
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
